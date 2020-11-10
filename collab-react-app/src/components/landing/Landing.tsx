import React from 'react';
import Room from './Room';
import RoomConnect from './RoomConnect';
import PlayerList from './PlayerList';

import { pingServer } from '../../App';

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

// async function pingServer(): Promise<number> {
//   const response = await fetch('./is-connected');
//   return response.status;
// }

export default Landing;
