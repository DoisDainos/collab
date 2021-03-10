import * as Interfaces from "../../interfaces/Interfaces";
import { SET_ROOM, ADD_PLAYER, SET_PLAYING, ADD_LINES } from "../actions/ActionTypes";
import { Interface } from "readline";

type IReducerFunction = (
  state: Interfaces.IPlayerState | undefined,
  action: Interfaces.IStringAction | Interfaces.IStringArrayAction | Interfaces.IBooleanAction | Interfaces.ILinesAction
) => Interfaces.IPlayerState;

const initialState: Interfaces.IPlayerState = {
  room: "",
  otherPlayers: [],
  canvasLines: [],
  playing: false
};

const RootReducer: IReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM:
      const room = action.payload as string;
			return {
				...state,
				room: room
			};
		case ADD_PLAYER:
			const names = action.payload as string[];
      return {
				...state,
				otherPlayers: names
			};
		case SET_PLAYING:
			const playing = action.payload as boolean;
      return {
				...state,
				playing: playing
			};
    case ADD_LINES:
      const lines = action.payload as Interfaces.ILine[];
      return {
        ...state,
        canvasLines: [ ...state.canvasLines, ...lines ]
      }
    default:
      return state;
  }
}

export default RootReducer;
