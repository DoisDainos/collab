import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../../styles/Landing.css';

function RoomConnect() {
  const [code, setCode] = useState('');

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
      <p>
        Code: { code }
      </p>
      <Button
        variant="primary"
        onClick={ () => onCodeSubmit(code) }
      >
        Submit
      </Button>
    </>
  );
}

async function onCodeSubmit(code: string) {
  const response = fetch('./connect-room-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}

export default RoomConnect;
