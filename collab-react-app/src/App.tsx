import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Room from "./components/room/Room";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/room">
              <Room />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
