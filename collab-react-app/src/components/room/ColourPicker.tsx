import React from "react";
import { ReactReduxContext } from "react-redux";
import { connect } from "react-redux";
import { setPlayerColour } from "../../utils/serverUtils";
import { IPlayerColourMap, IPlayerState } from "../../interfaces/Interfaces";

const ClassName = {
  container: "container-colourPicker",
  item: "item-colourPicker",
  palette: "palette-colourPicker",
  unavailable: "unavailable",
}

const colours = [
  "#000075", // Navy
  "#800000", // Maroon
  "#0d8a37", // Green
  "#911eb4", // Purple
  "#ff0000", // Red
  "#0000ff", // Blue
  "#f58231", // Orange
  "#469990", // Teal
  "#9A6324", // Brown
  "#f032e6", // Magenta
  "#42d4f4", // Cyan
  "#808000", // Olive
]

const ColourPicker = () => {

  const setColour = (roomCode: string, playerName: string, obj: HTMLDivElement) => {
		setPlayerColour(roomCode, playerName, obj.id);
	}

  const colourIsAvailable = (colour: string, playerColourMap: IPlayerColourMap): boolean => {
    for (const player in playerColourMap) {
      if (playerColourMap[player] === colour) {
        return false;
      }
    }
    return true;
  }

  const getItemClassName = (colour: string, playerColourMap: IPlayerColourMap) => {
    if (colourIsAvailable(colour, playerColourMap)) {
      return `${ClassName.item}`
    }
    return `${ClassName.item} ${ClassName.unavailable}`
  }

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        const state = store.getState();
        return (
        	<div className={ClassName.container}>
        			<div>Choose Color</div>
              <div className={ClassName.palette}>
                {
                  colours.map((colour, index) => (
            			   <div
                      onClick={ e => {
                        if (colourIsAvailable(colour, state.playerColourMap)) {
                          setColour(state.room, state.name, e.target as HTMLDivElement)
                        }
                      }}
                      style={{ background: colour }}
                      id={colour}
                      key={index}
                      className={getItemClassName(colour, state.playerColourMap)}
                    >
                    </div>
                  ))
                }
              </div>
        	</div>
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
