const utils = require('../server-common/utils');
const WebSocket = require('ws');

const port = 8081;
const wss = new WebSocket.Server({ port: 8081 });

// { [CODE]: { players: [{ playerName: string, role: string, socket: WebSocket, position: number }], game: { lines: Line[], currentPlayerPosition: number } } }
const roomStateMap = {};

wss.on('connection', ws => {
  console.log(`Connected on port ${port}`)
  ws.on('message', function incoming(message) {
    try {
      const messageParsed = JSON.parse(message);
      console.log('Received:', messageParsed);
      const data = JSON.parse(messageParsed.content);
      switch (messageParsed.type) {

        case 'NewRoom':
          handleNewRoom(ws, data);
          break;

        case 'ConnectRoom':
          handleConnectToRoom(ws, data);
          break;

        case 'StartGame':
          handleStartGame(data);
          break;

        case 'GetRole':
          // Data: { code: string, playerName: string, possibleRoles: Array<{ roleName: string, roleCount: number }> }
          handleGetRole(ws, data);
          break;

        case 'GetFirstPlayer':
          // Data: { code: string }
          handleGetFirstPlayer(ws, data);
          break;

        case 'Draw':
          handleDraw(data);
          break;

        case 'EndTurn':
          handleEndTurn(data);
          break;

        default:
          console.log('Default message received');
      }
    } catch (e) {
      console.error(e);
    }
  });
});

// Generate ID and send it back to the client
function handleNewRoom(ws, data) {
  console.log('New room');
  let code = utils.generateId();
  while (roomStateMap[code]) {
    code = utils.generateId();
  }
  if (code === utils.getLimitCode()) {
    ws.send(JSON.stringify({ type: 'NewRoom', content: { limitReached: true }}));
  } else {
    roomStateMap[code] = {
      players: [{ playerName: data.player, socket: ws } ],
      game: {}
    };
    ws.send(JSON.stringify({ type: 'NewRoom', content: { code: code } }));
  }
}

// Given a room code, send back all players in that room
// If the room doesn't exist, send back invalid: true
function handleConnectToRoom(ws, data) {
  console.log('Connect to room');
  if (!roomStateMap[data.code]) {
    ws.send(JSON.stringify({ type: 'ConnectRoom', content: { players: [], invalid: true } }));
    console.log('Invalid or nonexistent code: ' + data.code);
  } else {
    roomStateMap[data.code].players.push({ playerName: data.player, socket: ws });
    const playerNames = [];
    const sockets = [];
    for (const player of roomStateMap[data.code].players) {
      playerNames.push(player.playerName);
      sockets.push(player.socket);
    }
    for (const socket of sockets) {
      socket.send(JSON.stringify({ type: 'ConnectRoom', content: { players: playerNames } }));
    }
    console.log(roomStateMap[data.code].players);
  }
}

function handleStartGame(data) {
  console.log(`Game started for room: ${ data.code }`);
  const players = roomStateMap[data.code].players;
  for (const player of players) {
    player.socket.send(JSON.stringify({ type: 'StartGame' }));
  }
}

function handleGetRole(ws, data) {
  console.log(data.playerName + ' has requested their role from the following possible roles:', ...data.possibleRoles);
  const room = roomStateMap[data.code];
  const existingRoles = {};
  let currentPlayer;
  for (const player of room.players) {
    if (player.playerName === data.playerName) {
      currentPlayer = player;
    }
    if (existingRoles[player.role]) {
      existingRoles[player.role]++;
    } else {
      existingRoles[player.role] = 1;
    }
  }
  console.log('Existing roles:', existingRoles);
  availableRoles = [];
  for (const role of data.possibleRoles) {
    if (role.roleCount !== existingRoles[role.roleName]) {
      availableRoles.push(role.roleName);
    }
  }
  const chosen = utils.getRandomIndex(availableRoles.length)
  console.log('Assigned ' + data.playerName + ' the role: ' + availableRoles[chosen]);
  currentPlayer.role = availableRoles[chosen];
  room.game.currentPlayerPosition = 0;
  ws.send(JSON.stringify({ type: 'GetRole', content: { role: availableRoles[chosen] } }));
}

function handleGetFirstPlayer(ws, data) {
  console.log('Get first player');
  const room = roomStateMap[data.code];
  const indices = [];
  for (let i = 0; i < room.players.length; i++) {
    if (!room.players[i].position) {
      indices.push(i);
    }
  }
  const playerPositionMap = {};
  let firstPlayer = "";
  for (const player of room.players) {
    if (!player.position) {
      const randomIndex = utils.getRandomIndex(indices.length)
      const position = indices[randomIndex];
      player.position = position;
      indices.splice(indices.indexOf(randomIndex), 1);
    }
    if (player.position === 0) {
      firstPlayer = player.playerName;
    }
    playerPositionMap[player.playerName] = player.position;
  }
  console.log('Player position map:', playerPositionMap);
  console.log('Sending first player to client:', firstPlayer);
  ws.send(JSON.stringify({ type: 'GetFirstPlayer', content: { activePlayer: firstPlayer } }));
}

function handleDraw(data) {
  console.log('Draw lines for all players in room');
  if (!roomStateMap[data.code].game.lines) {
    roomStateMap[data.code].game.lines = [];
  }
  roomStateMap[data.code].game.lines.push(data.lines);
  for (const player of roomStateMap[data.code].players) {
    if (player.playerName !== data.player) {
      player.socket.send(JSON.stringify({ type: 'Draw', content: { lines: data.lines, strokeStyle: data.strokeStyle, lineWidth: data.lineWidth } }));
    }
  }
}

function handleEndTurn(data) {
  console.log('Ending turn');
  const room = roomStateMap[data.code];
  let activePlayer = "";
  room.game.currentPlayerPosition++;
  if (room.game.currentPlayerPosition >= room.players.length) {
    room.game.currentPlayerPosition = 0;
  }
  for (const player of room.players) {
    if (player.position === room.game.currentPlayerPosition) {
      activePlayer = player.playerName;
    }
  }
  console.log(`New active player: ${activePlayer}`);
  for (const player of room.players) {
    player.socket.send(JSON.stringify({ type: 'EndTurn', content: { activePlayer: activePlayer } }));
  }
}
