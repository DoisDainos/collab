import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Landing from "./components/landing/Landing";
import Room from "./components/room/Room";
import Game from "./components/game/Game";
import Actions from "./redux/actions/Actions";
import "./App.css";
import { IServerMessage } from "./interfaces/Interfaces";
import { listenForMessage } from "./utils/serverUtils";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    listenForMessage(handleServerMessage);
  });
  
  const handleServerMessage = (message: IServerMessage) => {
    switch (message.type) {
      case "NewRoom":
        let code: string;
        if (!message.content || !message.content.code) {
          code = "ERROR"
        } else {
          code = message.content.code;
        }
        dispatch(Actions.setRoom(message.content.code));
        break;
      case "ConnectRoom":
        dispatch(Actions.setPlayers(message.content.players));
        break;
      case "Draw":
        dispatch(Actions.addLines(message.content.lines));
        break;
        // TODO: start game
      default:
        break;
    }
  }

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
