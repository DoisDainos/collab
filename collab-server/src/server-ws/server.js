const utils = require('../server-common/utils');
const WebSocket = require('ws');

const port = 8081;
const wss = new WebSocket.Server({ port: port });

// { [CODE]: { players: [{ name: string, role: string, socket: WebSocket, position: number, colour: string }], game: { word: string, lines: Line[], currentPlayerPosition: number, time: number, intervalId: number, guessingPlayer: string } } }
const roomStateMap = {};

const GAME_TIME = 300;

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

        case 'SetPlayerColour':
          // data: { code: string, name: string, colour: string }
          handleSetPlayerColour(data);
          break;

        case 'StartGame':
          handleStartGame(data);
          break;

        case 'GetRole':
          // data: { code: string, name: string, possibleRoles: Array<{ role: string, roleCount: number }> }
          handleGetRole(ws, data);
          break;

        case 'GetWord':
          // data: { code: string, name: string }
          handleGetWord(data);
          break;

        case 'GetFirstPlayer':
          // data: { code: string }
          handleGetFirstPlayer(ws, data);
          break;

        case 'Draw':
          handleDraw(data);
          break;

        case 'EndTurn':
          handleEndTurn(data);
          break;

        case 'StartGuess':
          // data: { code: string, name: string }
          handleStartGuess(data);
          break;

        case 'EndGuess':
          // data: { code: string }
          handleEndGuess(data);
          break;

        case 'SubmitGuess':
          // data: { code: string, guessedName: string }
          handleSubmitGuess(data);
          break;

        case 'GetState':
          // data: { name: string, code: string }
          handleGetState(ws, data);
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
      players: [{ name: data.player, socket: ws } ],
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
    roomStateMap[data.code].players.push({ name: data.player, socket: ws });
    const names = [];
    const sockets = [];
    for (const player of roomStateMap[data.code].players) {
      names.push(player.name);
      sockets.push(player.socket);
    }
    for (const socket of sockets) {
      socket.send(JSON.stringify({ type: 'ConnectRoom', content: { players: names } }));
    }
    console.log(roomStateMap[data.code].players);
  }
}

function handleStartGame(data) {
  console.log(`Game started for room: ${ data.code }`);
  const players = roomStateMap[data.code].players;
  roomStateMap[data.code].time = GAME_TIME;
  setTimeout(() => {
    roomStateMap[data.code].intervalId = setInterval(() => {
      roomStateMap[data.code].time--;
      if (roomStateMap[data.code].time === 0) {
        handleEndGame(data.code);
      }
    }, 1000);
  }, 1000);
  for (const player of players) {
    player.socket.send(JSON.stringify({ type: 'StartGame', content: { time: roomStateMap[data.code].time } }));
  }
}

function handleSetPlayerColour(data) {
  console.log(`Setting ${data.colour} colour for ${data.name} in room ${data.code}`);
  const room = roomStateMap[data.code];
  for (const player of room.players) {
    if (player === data.name) {
      player.colour = data.colour;
    }
    player.socket.send(JSON.stringify({ type: 'SetPlayerColour', content: { name: data.name, colour: data.colour } }));
  }
}

function handleGetRole(ws, data) {
  console.log(data.name + ' has requested their role from the following possible roles:', ...data.possibleRoles);
  const room = roomStateMap[data.code];
  const existingRoles = {};
  let currentPlayer;
  for (const player of room.players) {
    if (player.name === data.name) {
      currentPlayer = player;
    }
    if (player.role) {
      if (existingRoles[player.role]) {
        existingRoles[player.role]++;
      } else {
        existingRoles[player.role] = 1;
      }
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
  console.log('Assigned ' + data.name + ' the role: ' + availableRoles[chosen]);
  currentPlayer.role = availableRoles[chosen];
  room.game.currentPlayerPosition = 0;
  ws.send(JSON.stringify({ type: 'GetRole', content: { role: availableRoles[chosen] } }));
}

function handleGetWord(data) {
  console.log(`Getting word for room: ${data.code}`);
  const room = roomStateMap[data.code];
  if (!room.game.word) {
    room.game.word = utils.getRandomWord();
    console.log(`Word: ${room.game.word}`);
    for (const player of room.players) {
      switch (player.role) {
        case 'Spy':
          player.socket.send(JSON.stringify({ type: 'GetWord', content: { word: undefined } }));
          break;
        default:
          player.socket.send(JSON.stringify({ type: 'GetWord', content: { word: room.game.word } }));
      }
    }
  }
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
  let firstPlayer = '';
  for (const player of room.players) {
    if (!player.position) {
      const randomIndex = utils.getRandomIndex(indices.length)
      const position = indices[randomIndex];
      player.position = position;
      indices.splice(indices.indexOf(randomIndex), 1);
    }
    if (player.position === 0) {
      firstPlayer = player.name;
    }
    playerPositionMap[player.name] = player.position;
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
    if (player.name !== data.player) {
      player.socket.send(JSON.stringify({ type: 'Draw', content: { lines: data.lines, name: data.player } }));
    }
  }
}

function handleEndTurn(data) {
  console.log('Ending turn');
  const room = roomStateMap[data.code];
  let activePlayer = '';
  room.game.currentPlayerPosition++;
  if (room.game.currentPlayerPosition >= room.players.length) {
    room.game.currentPlayerPosition = 0;
  }
  for (const player of room.players) {
    if (player.position === room.game.currentPlayerPosition) {
      activePlayer = player.name;
    }
  }
  console.log(`New active player: ${activePlayer}`);
  for (const player of room.players) {
    player.socket.send(JSON.stringify({ type: 'EndTurn', content: { activePlayer: activePlayer } }));
  }
}

function handleStartGuess(data) {
  console.log(`Guess has been started for room ${data.code} by ${data.name}`);
  const room = roomStateMap[data.code];
  room.game.guessingPlayer = data.name;
  for (const player of room.players) {
    player.socket.send(JSON.stringify({ type: 'StartGuess', content: { name: data.name } }));
  }
}

function handleEndGuess(data) {
  console.log(`Guess ended for room ${data.code}`);
  const room = roomStateMap[data.code];
  room.game.guessingPlayer = '';
  for (const player of room.players) {
    player.socket.send(JSON.stringify({ type: 'EndGuess', content: {} }));
  }
}

function handleSubmitGuess(data) {
  console.log(`Guess submitted for room ${data.code}: ${data.guessedName}`);
  const room = roomStateMap[data.code];
  let correct = false;
  for (const player of room.players) {
    if (player.name === data.guessedName && player.role === 'Spy') {
      correct = true
    }
  }
  for (const player of room.players) {
    player.socket.send(JSON.stringify({ type: 'SubmitGuess', content: { correct: correct } }));
  }
  if (correct) {
    console.log('Correct!');
    handleEndGame(data.code);
  } else {
    console.log('Incorrect!');
  }
}

function handleEndGame(code) {
  console.log('Game ended!')
  clearInterval(roomStateMap[code].intervalId);
  let spy;
  for (const player of roomStateMap[code].players) {
    if (player.role === 'Spy') {
      spy = player.name;
    }
  }
  console.log(`Sending players the spy ${spy}`);
  for (const player of roomStateMap[code].players) {
    player.socket.send(JSON.stringify({ type: 'EndGame', content: { spy: spy } }));
  }
}

function handleGetState(ws, data) {
  console.log(`${data.name} has requested the game state for ${data.code}`);
  const room = roomStateMap[data.code];
  const players = [];
  const playerColourMap = {};
  let activePlayer = '';
  let role = '';
  for (const player of room.players) {
    players.push(player.name);
    if (player.colour) {
      playerColourMap[player.name] = player.colour;
    }
    if (player.position === room.game.currentPlayerPosition) {
      activePlayer = player.name;
    }
    if (player.name === data.name) {
      role = player.role;
    }
  }
  ws.send(JSON.stringify(
    {
      type: 'GetState',
      content: {
        state: {
          room: data.code,
          name: data.name,
          players: players,
          playerColourMap: playerColourMap,
          activePlayer: activePlayer,
          canvasLines: room.game.lines,
          role: role,
          gameWord: role !== 'Spy' ? room.game.word : '',
          guessingPlayer: room.game.guessingPlayer,
          time: room.game.time,
          // TODO: guessedSpy: boolean, gameEnded: boolean, spy: string
        }
      }
    }
  ));
}
