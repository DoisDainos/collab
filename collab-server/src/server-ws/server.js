const WebSocket = require('ws');
const port = 8080;
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log(`Connected on port ${port}`)
  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);
      switch (data.type) {
        
      }
    } catch (e) {
      console.error(e);
    }
  });

  ws.send('something');
});
