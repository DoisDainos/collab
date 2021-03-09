import React, { useEffect } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { listenForRoomConnections } from "../../utils/serverUtils";
import PlayerList from "./PlayerList";
import Actions from "../../redux/actions/Actions";

function Room() {
  const dispatch = useDispatch();

  useEffect(() => {
    const waitForPlayers = async () => {
      while (true) {
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
          </>
        );
      }}
    </ReactReduxContext.Consumer>
  );
}

export default Room;
