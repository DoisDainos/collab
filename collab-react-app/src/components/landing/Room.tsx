import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { parseTextResponse } from '../../utils/serverUtils';

function Room() {
  const [code, setCode] = useState('');

  return (
    <>
      <p>
        Room
      </p>
      <Button
        variant="primary"
        onClick={ () => onGenerateClick(setCode) }
      >
        Generate room code
      </Button>
      <p>
        Code: { code }
      </p>
    </>
  );
}

async function onGenerateClick(setCode: React.Dispatch<React.SetStateAction<string>>) {
  const code = await generateRoomCode();
  setCode(code);
}

async function generateRoomCode(): Promise<string> {
  const response = await fetch('./new-room');
  const roomCode = await parseTextResponse(response);
  console.log(roomCode);
  return roomCode;
}

export default Room;
