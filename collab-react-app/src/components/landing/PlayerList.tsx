import React from 'react';
import { ReactReduxContext } from 'react-redux';

function PlayerList() {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return (
          <>
            {
              store.getState().room
            }
          </>
        )
      }}
    </ReactReduxContext.Consumer>
  );
}

export default PlayerList;
