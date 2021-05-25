import React from "react";
import { ReactReduxContext } from "react-redux";
import { connect } from "react-redux";
import { setPlayerColour } from "../../utils/serverUtils";
import { IPlayerColourMap, IPlayerState } from "../../interfaces/Interfaces";

const colours = [
  "green",
  "blue",
  "red",
  "yellow",
  "orange",
  "black",
]

const ColourPicker = () => {

  const setColour = (roomCode: string, playerName: string, obj: HTMLDivElement) => {
		setPlayerColour(roomCode, playerName, obj.id);
	}

  const isColourAvailable = (colour: string, playerColourMap: IPlayerColourMap, playerName: string): boolean => {
    for (const player in playerColourMap) {
      if (player === playerName) {
        continue;
      }
      if (playerColourMap[player] === colour) {
        return false;
      }
    }
    return true;
  }

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        const state = store.getState();
        return (
        	<>
        			<div onClick={ e => setColour(state.room, state.name, e.target as HTMLDivElement) }>Choose Color</div>
              {
                colours.map((colour, index) => {
                  return isColourAvailable(colour, state.playerColourMap, state.name) &&
            			   <div
                      onClick={ e => setColour(state.room, state.name, e.target as HTMLDivElement) }
                      style={{ width: "20px", height: "20px", background: colour }}
                      id={colour}
                      key={index}
                    >
                    </div>
                })
              }
        	</>
      	);
      }}
    </ReactReduxContext.Consumer>
  );
}

const mapStateToProps = (state: IPlayerState) => {
  return {
    room: state.room,
    name: state.name,
    players: state.players,
    playerColourMap: state.playerColourMap,
  }
}

export default connect(mapStateToProps)(ColourPicker);
