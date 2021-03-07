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
          handleNewRoom(ws);
          break;

        case 'ConnectRoom':
          handleConnectToRoom(ws, data);
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
function handleNewRoom(ws) {
  console.log('New room');
  let code = utils.generateId();
  while (roomPlayerMap[code]) {
    code = utils.generateId();
  }
  if (code === utils.getLimitCode()) {
    ws.send(JSON.stringify({ type: 'NewRoom', content: { limitReached: true }}));
  } else {
    roomPlayerMap[code] = [];
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

// Add to list of players for a given room code, send back new list
// Handle all player rooms in memory for now
function addPlayerToRoom(ws, data) {
  console.log('Add player name to room');
  const content = JSON.parse(data.content);
  if (!roomPlayerMap[content.code] || roomPlayerMap[content.code].includes(content.player)) {
    ws.send(JSON.stringify({ type: 'AddPlayer', content: { players: [], invalid: true } }));
  } else {
    ws.send(JSON.stringify({ type: 'AddPlayer', content: { players: roomPlayerMap[content.player] } }));
  }
}
