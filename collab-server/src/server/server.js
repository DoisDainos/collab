const express = require('express');
const utils = require('./utils');

const app = express();
const port = process.env.port || 6969;
const rooms = [];

app.set('host', 'localhost');
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/is-connected', (_, res) => {
  res.send({ express: `Connected` });
  console.log(`Accepted new connnection`);
});

app.get('/new-room', (_, res) => {
  const roomId = utils.generateId(4);
  res.send(roomId);
  rooms.push(roomId);
  console.log(`Generated id: ${roomId}`);
});

app.post('/');
