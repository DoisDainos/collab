import { IPlayerState, IStringAction, IStringArrayAction } from "../../interfaces/Interfaces";
import { SET_ROOM, ADD_PLAYER } from "../actions/ActionTypes";

type IReducerFunction = (state: IPlayerState | undefined, action: IStringAction | IStringArrayAction) => IPlayerState;

const initialState: IPlayerState = {
  room: "",
  otherPlayers: []
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
    default:
      return state;
  }
}

export default RootReducer;
