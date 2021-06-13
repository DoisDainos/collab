import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Landing from "./components/landing/Landing";
import Room from "./components/room/Room";
import Game from "./components/game/Game";
import Actions from "./redux/actions/Actions";
import "./App.css";
import { IServerMessage, ILine, ILineFromPlayer } from "./interfaces/Interfaces";
import { listenForMessage, getState, pingServer } from "./utils/serverUtils";
import * as SessionStorageUtils from "./utils/sessionStorageUtils";

enum ConnectState {
  LOADING,
  CONNECTED,
  FAILED
}

const App = () => {
  const dispatch = useDispatch();
  const [ connected, setConnected ] = useState<ConnectState>(ConnectState.LOADING);

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
        const info = SessionStorageUtils.getPlayerInfo();
        if (info) {
          getState(info.room, info.name);
        }
        if (connected !== ConnectState.CONNECTED) {
          setConnected(ConnectState.CONNECTED);
        }
      } else {
        if (connected !== ConnectState.FAILED) {
          setConnected(ConnectState.FAILED);
        }
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
        if (message.content.invalid) {
          dispatch(Actions.setInvalidRoomCode(true));
        } else {
          dispatch(Actions.setPlayers(message.content.players));
        }
        break;
      case "SetPlayerColour":
        dispatch(Actions.setPlayerColour(message.content.name, message.content.colour));
        break;
      case "StartGame":
        dispatch(Actions.setTime(message.content.time));
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
            playerName: message.content.name as string,
          })
        }
        dispatch(Actions.addLines(linesFromPlayer));
        break;
      case "EndTurn":
      case "GetFirstPlayer":
        dispatch(Actions.setActivePlayer(message.content.activePlayer));
        break;
      case "StartGuess":
        dispatch(Actions.startGuess(message.content.name));
        break;
      case "EndGuess":
        dispatch(Actions.endGuess());
        break;
      case "SubmitGuess":
        dispatch(Actions.submitGuess(message.content.correct));
        break;
      case "EndGame":
        dispatch(Actions.endGame(message.content.spy));
        break;
      case "GetState":
        dispatch(Actions.setState(message.content.state));
        break;
      default:
        break;
    }
  }

  if (connected === ConnectState.FAILED) {
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
