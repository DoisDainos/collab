import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Actions from "../../redux/actions/Actions";
import { submitRoomCode, generateRoomCode } from "../../utils/serverUtils";

const ClassName = {
  container: "container-roomConnect",
}

const RoomConnect = () => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const history = useHistory();

  // const iconPath = process.env.PUBLIC_URL + "/assets/";

  return (
    <div className={ClassName.container}>
      <div>
        <TextField
          value={name}
          color="primary"
          placeholder="Enter player name"
          onChange={event => setName(event.target.value)}
          fullWidth={true}
          inputProps={{
            style: { fontSize: "calc(10px + 2vmin)" }
          }}
        />
      </div>
      <p>
        Connect to existing room
      </p>
      <div>
        <TextField
          value={code}
          color="primary"
          placeholder="Enter room code"
          onChange={event => setCode(event.target.value)}
          fullWidth={true}
          inputProps={{
            style: { fontSize: "calc(10px + 2vmin)" }
          }}
        />
      </div>
      <div>
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
          fullWidth={true}
          style={{ fontSize: "calc(10px + 2vmin)" }}
        >
          Submit
        </Button>
      </div>
      <p>
        Create new room
      </p>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={ () => {
            generateRoomCode(name);
            dispatch(Actions.setName(name));
            history.push("/room");
          }}
          fullWidth={true}
          style={{ fontSize: "calc(10px + 2vmin)" }}
        >
          New Room
        </Button>
      </div>
    </div>
  )
}

export default RoomConnect;
