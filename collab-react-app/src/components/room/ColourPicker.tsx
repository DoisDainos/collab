import React from "react";
import { ReactReduxContext } from "react-redux";
import { connect } from "react-redux";
import { setPlayerColour } from "../../utils/serverUtils";
import { IPlayerColourMap, IPlayerState } from "../../interfaces/Interfaces";

const ClassName = {
  container: "container-colourPicker",
  item: "item-colourPicker",
  palette: "palette-colourPicker",
}

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

  const isColourAvailable = (colour: string, playerColourMap: IPlayerColourMap): boolean => {
    for (const player in playerColourMap) {
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
        	<div className={ClassName.container}>
        			<div>Choose Color</div>
              <div className={ClassName.palette}>
                {
                  colours.map((colour, index) => {
                    return isColourAvailable(colour, state.playerColourMap) &&
              			   <div
                        onClick={ e => setColour(state.room, state.name, e.target as HTMLDivElement) }
                        style={{ background: colour }}
                        id={colour}
                        key={index}
                        className={ClassName.item}
                      >
                      </div>
                  })
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
