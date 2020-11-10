const utils = require('../server-common/utils');
const WebSocket = require('ws');

const port = 8080;
const wss = new WebSocket.Server({ port: 8080 });

const playerMap = {};

wss.on('connection', function connection(ws) {
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

function handleNewRoom(ws) {
  console.log('New room');
  const id = utils.generateId();
  ws.send(JSON.stringify({ type: 'NewRoom', content: id }))
}

function handleConnectToRoom(ws, data) {
  console.log('Connect to room');
  const content = JSON.parse(data.content);
  playerMap[content.player] = content.code;
  console.log(playerMap);
}
