const utils = require('../server-common/utils');
const WebSocket = require('ws');

const port = 8081;
const wss = new WebSocket.Server({ port: 8081 });

// { [CODE]: [{ playerName: "", socket: ws }] }
const roomPlayerMap = {};

wss.on('connection', ws => {
  console.log(`Connected on port ${port}`)
  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);

      switch (data.type) {

        case 'NewRoom':
          handleNewRoom(ws, data);
          break;

        case 'ConnectRoom':
          handleConnectToRoom(ws, data);
          break;

        case 'StartGame':
          handleStartGame(data);
          break;

        case 'Draw':
          handleDraw(data);

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
  const content = JSON.parse(data.content);
  let code = utils.generateId();
  while (roomPlayerMap[code]) {
    code = utils.generateId();
  }
  if (code === utils.getLimitCode()) {
    ws.send(JSON.stringify({ type: 'NewRoom', content: { limitReached: true }}));
  } else {
    roomPlayerMap[code] = [{ playerName: content.player, socket: ws }];
    ws.send(JSON.stringify({ type: 'NewRoom', content: { code: code } }));
  }
}

// Given a room code, send back all players in that room
// If the room doesn't exist, send back invalid: true
function handleConnectToRoom(ws, data) {
  console.log('Connect to room');
  const content = JSON.parse(data.content);
  if (!roomPlayerMap[content.code]) {
    ws.send(JSON.stringify({ type: 'ConnectRoom', content: { players: [], invalid: true } }));
    console.log("Invalid or nonexistent code: " + content.code);
  } else {
    roomPlayerMap[content.code].push({ playerName: content.player, socket: ws });
    const playerNames = [];
    const sockets = [];
    for (const player of roomPlayerMap[content.code]) {
      playerNames.push(player.playerName);
      sockets.push(player.socket);
    }
    for (const socket of sockets) {
      console.log("socket; " + socket);
      socket.send(JSON.stringify({ type: 'ConnectRoom', content: { players: playerNames } }));
    }
    console.log(roomPlayerMap[content.code]);
  }
}

function handleStartGame(data) {
  const content = JSON.parse(data.content);
  console.log(`Game started for room: ${ content.code }`);
  const players = roomPlayerMap[content.code];
  for (const player of players) {
    player.socket.send(JSON.stringify({ type: 'StartGame' }));
  }
}

function handleDraw(data) {
  console.log('Draw lines for all players in room');
  const content = JSON.parse(data.content);
  for (const player of roomPlayerMap[content.code]) {
    player.socket.send(JSON.stringify({ type: 'Draw', content: { lines: content.lines } }))
  }
}
