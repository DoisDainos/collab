import React, { useState, useEffect } from 'react';
import Room from './Room';
import RoomConnect from './RoomConnect';
import PlayerList from './PlayerList';

import { pingServer } from '../../utils/serverUtils';

const Landing = () => {
  const [failed, setFailure] = useState<boolean>(false);

  useEffect(() => {
    const attemptConnection = async () => {
      const success = await pingServer();
      setFailure(success);
    }
    attemptConnection();
  }, []);

  if (!failed) {
    return (
      <div className="Landing-error">
        <p>
          Could not connect to server
        </p>
      </div>
    )
  }
  console.log("Connected");
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
