import React, { useState } from 'react';
import { ReactReduxContext } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Actions from '../../redux/actions/Actions';
import { IStringArrayAction } from '../../interfaces/Interfaces';
import { submitRoomCode, listenForRoomConnections } from '../../utils/serverUtils';

const RoomConnect = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

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
                store.dispatch(Actions.setRoom(code));
                onCodeSubmit(code, name, store.dispatch);
              }}
            >
              Submit
            </Button>
            {/* {
              roomPlayers.map((player, index) => {
                return <p key={index}>
                  {player}
                </p>
              })
            } */}
          </>
        )
      }}
    </ReactReduxContext.Consumer>
  );
}

async function onCodeSubmit(code: string, player: string, dispatch: React.Dispatch<IStringArrayAction>) {
  const response = await submitRoomCode(code, player);
  if (response.invalid) {
    console.log("Invalid or nonexistent code");
  }
  dispatch(Actions.setPlayers(response.players));
  while (true) {
    dispatch(Actions.setPlayers(await listenForRoomConnections()));
  }
}

export default RoomConnect;
