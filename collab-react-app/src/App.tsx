import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Landing from "./components/landing/Landing";
import Room from "./components/room/Room";
import Game from "./components/game/Game";
import Actions from "./redux/actions/Actions";
import "./App.css";
import { IServerMessage, ILine, ILineWithStyle } from "./interfaces/Interfaces";
import { listenForMessage } from "./utils/serverUtils";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
      case "StartGame":
        dispatch(Actions.setPlaying(true));
        break;
      case "Draw":
        const linesWithStyle: ILineWithStyle[] = [];
        for (const line of message.content.lines as ILine[]) {
          linesWithStyle.push({
            startX: line.startX,
            startY: line.startY,
            endX: line.endX,
            endY: line.endY,
            strokeStyle: message.content.strokeStyle as string,
            lineWidth: message.content.lineWidth as number
          })
        }
        dispatch(Actions.addLines(linesWithStyle));
        break;
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
