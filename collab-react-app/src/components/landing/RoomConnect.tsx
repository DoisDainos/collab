import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { submitRoomCode } from '../../App';
import { parseTextResponse } from '../../utils/serverUtils';

function RoomConnect() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [roomPlayers, setRoomPlayers] = useState<string[]>([]);

  return (
    <>
      <p>
        Connect to existing room
      </p>
      <input
        value={ code }
        placeholder="Enter room code"
        onChange={ event => setCode(event.target.value) }
      />
      <input
        value={ name }
        placeholder="Enter player name"
        onChange={ event => setName(event.target.value) }
      />
      <p>
        Code: { code }
      </p>
      <Button
        variant="primary"
        onClick={ () => {
          onCodeSubmit(code, name, setRoomPlayers);
        } }
      >
        Submit
      </Button>
      {
        roomPlayers.map((player, index) => {
          return <p key={ index }>
            { player }
          </p>
        })
      }
    </>
  );
}

async function onCodeSubmit(code: string, player: string, dispatch: React.Dispatch<string[]>) {
  const response = await submitRoomCode(code, player);
  if (response.invalid) {
    console.log("Invalid or nonexistent code");
  }
  dispatch(response.players);
}

export default RoomConnect;
