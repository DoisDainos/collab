import React from 'react';
import Room from './Room';
import RoomConnect from './RoomConnect';
import '../../styles/Landing.css';

async function Landing() {
  const status = await pingServer();
  switch (status) {
    case 200:
      console.log("Connect");
      break;
    case 400:
    case 404:
    case 500:
    default:
      return (
        <div className="Landing-error">
          <p>
            Could not connect to server
          </p>
        </div>
      )
  }
  return (
    <>
      Connected to server
      <hr style={{ "width": "100%" }} />
      <Room />
      <hr style={{ "width": "100%" }} />
      <RoomConnect />
    </>
  );
}

async function pingServer(): Promise<number> {
  const response = await fetch('./is-connected');
  return response.status;
}

export default Landing;
