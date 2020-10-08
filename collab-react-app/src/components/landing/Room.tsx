import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import '../../styles/Landing.css';

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
  if (response.body) {
    const reader = response.body.getReader();
    const result = await reader.read();
    const decodedRoomCode = new TextDecoder('utf-8').decode(result.value)
    console.log(decodedRoomCode);
    return decodedRoomCode;
  }
  return '';
}

export default Room;
