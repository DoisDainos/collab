import React, { useEffect } from "react";
import { ReactReduxContext, connect, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PlayerList from "./PlayerList";
import ColourPicker from "./ColourPicker";
import { startRoomGame } from "../../utils/serverUtils";
import { IPlayerState } from "../../interfaces/Interfaces";
import * as SessionStorageUtils from "../../utils/sessionStorageUtils";

const ClassName = {
  container: "container-room",
}

function Room() {
  const history = useHistory();
  const location = useLocation();
  const room = useSelector<IPlayerState>(state => state.room) as string;
  const name = useSelector<IPlayerState>(state => state.name) as string;

  useEffect(() => {
    if (name && room) {
      SessionStorageUtils.setPlayerInfo({
        name: name,
        room: room
      });
    }
  }, []);

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
