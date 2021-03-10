import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Actions from "../../redux/actions/Actions";
import { submitRoomCode, generateRoomCode } from "../../utils/serverUtils";

const RoomConnect = () => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  
  const history = useHistory();

  return (
    <>
      <input
        value={name}
        placeholder="Enter player name"
        onChange={event => setName(event.target.value)}
      />
      <p>
        Connect to existing room
      </p>
      <input
        value={code}
        placeholder="Enter room code"
        onChange={event => setCode(event.target.value)}
      />
      <Button
        variant="primary"
        onClick={() => {
          dispatch(Actions.setPlayers([ name ]));
          dispatch(Actions.setName(name));
          dispatch(Actions.setRoom(code));
          submitRoomCode(code, name);
          history.push("/room");
        }}
      >
        Submit
      </Button>
      <p>
        Create new room
      </p>
      <Button
        variant="primary"
        onClick={ () => {
          generateRoomCode(name);
          dispatch(Actions.setName(name));
          history.push("/room");
        }}
      >
        New Room
      </Button>
    </>
  )
}

export default RoomConnect;
