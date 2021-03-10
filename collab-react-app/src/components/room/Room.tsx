import React from "react";
import { ReactReduxContext, connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PlayerList from "./PlayerList";
import { startRoomGame } from "../../utils/serverUtils";

function Room() {
  const history = useHistory();
  const location = useLocation();

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        if (location.pathname !== "game" && store.getState().playing) {
          history.push("/game");
        }
        return (
          <>
            <p>
              Room: { store.getState().room }
            </p>
            <PlayerList />
            <Button
              variant="primary"
              onClick={() => {
                startRoomGame(store.getState().room);
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

const mapStateToProps = (state: any) => {
  return {
    room: state.room,
    playing: state.playing
  }
}

export default connect(mapStateToProps)(Room);
