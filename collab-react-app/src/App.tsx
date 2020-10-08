import React, { useState, useEffect } from 'react';
import Landing from './components/landing/Landing';
import './App.css';

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

export default App;
