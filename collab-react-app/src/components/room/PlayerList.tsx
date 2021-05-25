import React from "react";
import { ReactReduxContext } from "react-redux";
import { connect } from "react-redux";
import { IPlayerState } from "../../interfaces/Interfaces";

const PlayerList = () => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return (
          <>
            <div>
              {
                store.getState().name
              }
            </div>
            <div>
              {
                store.getState().players.map((name: string, index: number) => {
                  if (store.getState().name !== name) {
                    return <p key={ index }>{ name }</p>
                  }
                })
              }
            </div>
          </>
        )
      }}
    </ReactReduxContext.Consumer>
  );
}

const mapStateToProps = (state: IPlayerState) => {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(PlayerList);
