import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Room from "./components/room/Room";
import Game from "./components/game/Game";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/room">
            <Room />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
