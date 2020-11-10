import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { generateRoomCode } from '../../App';

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
  let code = await generateRoomCode();
  if (!code) {
    code = 'ERROR'
  }
  setCode(code);
}

export default Room;
