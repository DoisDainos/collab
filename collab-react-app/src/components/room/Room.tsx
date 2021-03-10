import React from "react";
import { ReactReduxContext, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PlayerList from "./PlayerList";

function Room() {
  const history = useHistory();

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

const mapStateToProps = (state: any) => {
  return {
    room: state.room
  }
}

export default connect(mapStateToProps)(Room);
