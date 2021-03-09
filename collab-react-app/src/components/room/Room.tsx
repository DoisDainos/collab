import React, { useEffect } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { listenForRoomConnections } from "../../utils/serverUtils";
import PlayerList from "./PlayerList";
import Actions from "../../redux/actions/Actions";

function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const waitForPlayers = async () => {
      while (location.pathname === "/room") {
        dispatch(Actions.setPlayers(await listenForRoomConnections()));
      }
    }
    waitForPlayers();
  });

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return (
          <>
            <p>
              Room: { store.getState().room }
            </p>
            <PlayerList />
            <Button
              variant="primary"
              onClick={() => {
                history.push("/game");
              }}
            >
              Start game
            </Button>
          </>
        );
      }}
    </ReactReduxContext.Consumer>
  );
}

export default Room;
