const express = require('express');
const utils = require('./utils');

const app = express();
const port = process.env.port || 6969;
const rooms = [];
const ID_LENGTH = 4;

app.set('host', 'localhost');
app.use(express.text());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/is-connected', (_, res) => {
  res.send({ express: `Connected` });
  console.log(`Accepted new connnection`);
});

app.get('/new-room', (_, res) => {
  const roomId = utils.generateId(ID_LENGTH);
  res.send(roomId);
  rooms.push(roomId);
  console.log(`Generated id: ${roomId}`);
});

app.post('/connect-room-code', (req, res) => {
  console.dir(req.body);
  if (!req.body || req.body.length !== ID_LENGTH) {
    res.status(400);
    res.send('Invalid room code');
    return;
  }
  const code = req.body;
  if (rooms.indexOf(code) === -1) {
    res.status(400);
    res.send('Room does not exist');
    return;
  }
  res.send('Success');
});
