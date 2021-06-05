import React from "react";
import { ReactReduxContext, connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PlayerList from "./PlayerList";
import ColourPicker from "./ColourPicker";
import { startRoomGame } from "../../utils/serverUtils";
import { IPlayerState } from "../../interfaces/Interfaces";

const ClassName = {
  container: "container-room",
}

function Room() {
  const history = useHistory();
  const location = useLocation();

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        const state = store.getState();
        if (location.pathname !== "game" && state.playing) {
          history.push("/game");
        }
        return (
          <div className={ClassName.container}>
            <p>
              Room: { state.room }
            </p>
            <PlayerList />
            <ColourPicker />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                startRoomGame(state.room);
              }}
              fullWidth={true}
              style={{ fontSize: "calc(10px + 2vmin)" }}
            >
              Start game
            </Button>
          </div>
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
