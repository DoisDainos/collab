import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Actions from "../../redux/actions/Actions";
import { submitRoomCode, generateRoomCode } from "../../utils/serverUtils";

const RoomConnect = () => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const history = useHistory();

  const iconPath = process.env.PUBLIC_URL + "/assets/";

  return (
    <>
      <TextField
        value={name}
        color="primary"
        placeholder="Enter player name"
        onChange={event => setName(event.target.value)}
      />
      <img
        src={`${iconPath}host.svg`}
      />
      <p>
        Connect to existing room
      </p>
      <TextField
        value={code}
        color="primary"
        placeholder="Enter room code"
        onChange={event => setCode(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
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
      <img
        src={`${iconPath}join.svg`}
      />
      <p>
        Create new room
      </p>
      <Button
        variant="contained"
        color="primary"
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
