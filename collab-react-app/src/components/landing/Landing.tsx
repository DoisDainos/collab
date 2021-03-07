import React from 'react';
import Room from './Room';
import RoomConnect from './RoomConnect';
import PlayerList from './PlayerList';

import { pingServer } from '../../App';

const WebSocket = require('ws');

// function processMessage(): boolean {
//
// }

interface IServerResponse {
  type: string;
}

async function Landing() {
  const success = await pingServer();
  if (!success) {
    return (
      <div className="Landing-error">
        <p>
          Could not connect to server
        </p>
      </div>
    )
  }
  console.log("Connect");
  return (
    <>
      Connected to server
      <hr style={{ "width": "100%" }} />
      <Room />
      <hr style={{ "width": "100%" }} />
      <RoomConnect />
      <hr style={{ "width": "100%" }} />
      <PlayerList />
    </>
  );
}

export default Landing;
