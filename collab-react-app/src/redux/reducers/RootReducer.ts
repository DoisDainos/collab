import * as Interfaces from "../../interfaces/Interfaces";
import * as ActionTypes from "../actions/ActionTypes";
import { Interface } from "readline";

type IReducerFunction = (
  state: Interfaces.IPlayerState | undefined,
  action: Interfaces.IStringAction | Interfaces.IStringArrayAction | Interfaces.IBooleanAction | Interfaces.ILinesAction
) => Interfaces.IPlayerState;

const initialState: Interfaces.IPlayerState = {
  room: "",
  name: "",
  players: [],
  canvasLines: [],
  playing: false
};

const RootReducer: IReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ROOM:
      const room = action.payload as string;
			return {
				...state,
				room: room
			};
    case ActionTypes.SET_NAME:
      const name = action.payload as string;
			return {
				...state,
				name: name
			};
		case ActionTypes.ADD_PLAYER:
			const names = action.payload as string[];
      return {
				...state,
				players: names
			};
		case ActionTypes.SET_PLAYING:
			const playing = action.payload as boolean;
      return {
				...state,
				playing: playing
			};
    case ActionTypes.ADD_LINES:
      const lines = action.payload as Interfaces.ILineWithStyle[];
      return {
        ...state,
        canvasLines: [ ...state.canvasLines, ...lines ]
      }
    default:
      return state;
  }
}

export default RootReducer;
