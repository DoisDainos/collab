import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Actions from "../../redux/actions/Actions";
import { submitRoomCode, generateRoomCode } from "../../utils/serverUtils";
import { IPlayerState } from "../../interfaces/Interfaces";
import InvalidRoomModal from "./InvalidRoomModal";

const ClassName = {
  container: "container-roomConnect",
}

const RoomConnect = () => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [nameError, setNameError] = useState(false);
  const [roomCodeError, setRoomCodeError] = useState(false);

  const invalidRoom = useSelector<IPlayerState>(state => state.invalidRoom) as boolean;
  const players = useSelector<IPlayerState>(state => state.players) as string[];

  const history = useHistory();

  // const iconPath = process.env.PUBLIC_URL + "/assets/";

  useEffect(() => {
    if (!invalidRoom && players.length > 0) {
      dispatch(Actions.setName(name));
      dispatch(Actions.setRoom(code));
      history.push("/room");
    }
  }, [invalidRoom, players]);

  return (
    <div className={ClassName.container}>
      <InvalidRoomModal
        room={code}
        open={invalidRoom}
        onClose={() => {
          dispatch(Actions.setInvalidRoomCode(false));
        }}
      />
      <div>
        <TextField
          error={nameError}
          value={name}
          color="primary"
          placeholder="Enter player name"
          onChange={event => {
            setName(event.target.value);
            if (nameError) {
              setNameError(false);
            }
          }}
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
          error={roomCodeError}
          value={code}
          color="primary"
          placeholder="Enter room code"
          onChange={event => {
            setCode(event.target.value);
            if (roomCodeError) {
              setRoomCodeError(false);
            }
          }}
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
            if (!name) {
              setNameError(true);
            } else {
              setNameError(false);
            }
            if (!code) {
              setRoomCodeError(true);
            } else {
              setRoomCodeError(false);
            }
            if (name && code) {
              submitRoomCode(code, name);
            }
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
            setRoomCodeError(false);
            if (!name) {
              setNameError(true);
            } else {
              setNameError(false);
              generateRoomCode(name);
              dispatch(Actions.setName(name));
              history.push("/room");
            }
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
