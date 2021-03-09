import React, { useState } from "react";
import { ReactReduxContext } from "react-redux";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Actions from "../../redux/actions/Actions";
import { IStringAction, IStringArrayAction } from "../../interfaces/Interfaces";
import { submitRoomCode, listenForRoomConnections } from "../../utils/serverUtils";

const RoomConnect = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  
  const history = useHistory();

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return (
          <>
            <p>
              Connect to existing room
            </p>
            <input
              value={code}
              placeholder="Enter room code"
              onChange={event => setCode(event.target.value)}
            />
            <input
              value={name}
              placeholder="Enter player name"
              onChange={event => setName(event.target.value)}
            />
            <p>
              Code: {code}
            </p>
            <Button
              variant="primary"
              onClick={() => {
                onCodeSubmit(code, name, store.dispatch);
                history.push("/room");
              }}
            >
              Submit
            </Button>
          </>
        )
      }}
    </ReactReduxContext.Consumer>
  );
}

async function onCodeSubmit(code: string, player: string, dispatch: React.Dispatch<IStringAction | IStringArrayAction>) {
  dispatch(Actions.setRoom(code));
  const response = await submitRoomCode(code, player);
  if (response.invalid) {
    console.log("Invalid or nonexistent code");
  }
  dispatch(Actions.setPlayers(response.players));
}

export default RoomConnect;
