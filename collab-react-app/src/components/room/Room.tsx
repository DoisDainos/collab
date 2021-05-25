import React from "react";
import { ReactReduxContext, connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PlayerList from "./PlayerList";
import ColourPicker from "./ColourPicker";
import { startRoomGame } from "../../utils/serverUtils";
import { IPlayerState } from "../../interfaces/Interfaces";

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
            <ColourPicker />
            <Button
              variant="contained"
              color="primary"
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

const mapStateToProps = (state: IPlayerState) => {
  return {
    room: state.room,
    playing: state.playing
  }
}

export default connect(mapStateToProps)(Room);
