import React from "react";
import { ReactReduxContext } from "react-redux";
import { connect } from "react-redux";

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

const mapStateToProps = (state: any) => {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(PlayerList);
