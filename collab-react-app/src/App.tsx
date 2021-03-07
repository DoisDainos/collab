import React, { useState, useEffect } from 'react';
import Landing from './components/landing/Landing';
import './App.css';

import { parseTextResponse } from './utils/serverUtils';

const socket = new WebSocket('ws://localhost:8081');

function App() {
  const [landing, setLanding] = useState(<div></div>);

  useEffect(() => {
    const getLandingComponent = async() => {
      const landingComponent = await Landing();
      setLanding(landingComponent);
    }
    getLandingComponent();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        { landing }
      </header>
    </div>
  );
}

export async function pingServer(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    socket.addEventListener('open', (event: Event) => {
      resolve(true);
    });
  }).catch(e => {
    console.error(e);
    return false;
  });
}

export async function generateRoomCode(): Promise<{ code: string }> {
  return new Promise<{ code: string }>((resolve, reject) => {
    socket.send(JSON.stringify({ type: 'NewRoom' }));
    listenForMessage('NewRoom', resolve);
  }).catch(e => {
    console.error(e);
    return { code: '' };
  });
}

export async function submitRoomCode(code: string, player: string): Promise<{ players: string[], invalid?: boolean }> {
  return new Promise<{ players: string[], invalid?: boolean }>((resolve, reject) => {
    const content = { code: code, player: player };
    socket.send(JSON.stringify({ type: 'ConnectRoom', content: JSON.stringify(content) }));
    listenForMessage('ConnectRoom', resolve);
  }).catch(e => {
    console.error(e);
    return { players: [], invalid: true };
  });
}

function listenForMessage(type: string, resolve: (data: any) => void) {
  socket.addEventListener('message', event => {
    let data;
    if (event.data) {
      data = JSON.parse(event.data);
    }
    if (data && data.type === type && data.content) {
      resolve(data.content);
    }
  });
}

export default App;
