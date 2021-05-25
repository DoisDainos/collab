import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Landing from "./components/landing/Landing";
import Room from "./components/room/Room";
import Game from "./components/game/Game";
import Actions from "./redux/actions/Actions";
import "./App.css";
import { IServerMessage, ILine, ILineFromPlayer } from "./interfaces/Interfaces";
import { listenForMessage, pingServer } from "./utils/serverUtils";

const App = () => {
  const dispatch = useDispatch();
  const [ connected, setConnected ] = useState<boolean>(false);

  useEffect(() => {
    const attemptConnection = async () => {
      let success = false;
      try {
        success = await pingServer();
      } catch (error) {
        console.error(error);
      }
      if (success) {
        listenForMessage(handleServerMessage);
      }
      if (success !== connected) {
        setConnected(success);
      }
    }
    attemptConnection();
  }, []);

  const handleServerMessage = (message: IServerMessage) => {
    switch (message.type) {
      case "NewRoom":
        let code: string;
        if (!message.content || !message.content.code) {
          code = "ERROR"
        } else {
          code = message.content.code;
        }
        dispatch(Actions.setRoom(code));
        break;
      case "ConnectRoom":
        dispatch(Actions.setPlayers(message.content.players));
        break;
      case "SetPlayerColour":
        dispatch(Actions.setPlayerColour(message.content.playerName, message.content.colour));
        break;
      case "StartGame":
        dispatch(Actions.setPlaying(true));
        break;
      case "GetRole":
        dispatch(Actions.setRole(message.content.role));
        break;
      case "GetWord":
        dispatch(Actions.setGameWord(message.content.word));
        break;
      case "Draw":
        const linesFromPlayer: ILineFromPlayer[] = [];
        for (const line of message.content.lines as ILine[]) {
          linesFromPlayer.push({
            startX: line.startX,
            startY: line.startY,
            endX: line.endX,
            endY: line.endY,
            playerName: message.content.playerName as string,
          })
        }
        dispatch(Actions.addLines(linesFromPlayer));
        break;
      case "EndTurn":
      case "GetFirstPlayer":
        dispatch(Actions.setActivePlayer(message.content.activePlayer));
        break;
      default:
        break;
    }
  }

  if (!connected) {
    return (
      <div className="App">
        <p>Failed to connect to server</p>
      </div>
    )
  } else {
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
}

export default App;
