import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { parseTextResponse } from '../../utils/serverUtils';

function RoomConnect() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [roomResponse, setRoomResponse] = useState('');

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
        onClick={ () => onCodeSubmit(code, setRoomResponse) }
      >
        Submit
      </Button>
      <p>
        { roomResponse }
      </p>
    </>
  );
}

async function onCodeSubmit(code: string, dispatch: React.Dispatch<string>) {
  const response = await fetch('./connect-room-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: code.toUpperCase()
  });
  dispatch(await parseTextResponse(response));
}

export default RoomConnect;
