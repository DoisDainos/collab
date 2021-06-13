import React from "react";
import { ReactReduxContext } from "react-redux";
import { connect } from "react-redux";
import { IPlayerState } from "../../interfaces/Interfaces";

const ClassName = {
  item: "item-playerList",
  row: "row-playerList",
  name: "name-playerList"
}

const PlayerList = () => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        const state = store.getState();
        return (
          <>
            <div className={ClassName.row}>
              <div className={ClassName.name}>
                {
                  state.name
                }
              </div>
              {
                !!state.playerColourMap[state.name] &&
                  <div
                    className={ClassName.item}
                    style={{ background: state.playerColourMap[state.name] }}
                  />
              }
            </div>
            <div>
              {
                state.players.map((name: string, index: number) => {
                  if (state.name !== name) {
                    return (
                      <div key={index}>
                        <div className={ClassName.row}>
                          <div className={ClassName.name}>{ name }</div>
                          {
                            !!state.playerColourMap[name] &&
                              <div
                                className={ClassName.item}
                                style={{ background: state.playerColourMap[name] }}
                              />
                          }
                        </div>
                      </div>
                    );
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
    players: state.players,
    playerColourMap: state.playerColourMap
  }
}

export default connect(mapStateToProps)(PlayerList);
