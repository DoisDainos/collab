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
                store.getState().otherPlayers.map((name: string, index: number) => {
                  return <p key={ index }>{ name }</p>
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
    otherPlayers: state.otherPlayers
  }
}

export default connect(mapStateToProps)(PlayerList);
