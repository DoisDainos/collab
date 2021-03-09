import * as Interfaces from "../../interfaces/Interfaces";
import { SET_ROOM, ADD_PLAYER, ADD_LINES } from "../actions/ActionTypes";

type IReducerFunction = (
  state: Interfaces.IPlayerState | undefined,
  action: Interfaces.IStringAction | Interfaces.IStringArrayAction | Interfaces.ILinesAction
) => Interfaces.IPlayerState;

const initialState: Interfaces.IPlayerState = {
  room: "",
  otherPlayers: [],
  canvasLines: []
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
