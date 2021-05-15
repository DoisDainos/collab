import * as Interfaces from "../../interfaces/Interfaces";
import * as ActionTypes from "../actions/ActionTypes";

type IReducerFunction = (
  state: Interfaces.IPlayerState | undefined,
  action: Interfaces.IStringAction | Interfaces.IStringArrayAction | Interfaces.IBooleanAction | Interfaces.ILinesAction | Interfaces.IRolesAction
) => Interfaces.IPlayerState;

const initialState: Interfaces.IPlayerState = {
  room: "",
  name: "",
  players: [],
  activePlayer: "",
  canvasLines: [],
  playing: false,
  role: "",
  possibleRoles: [],
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
    case ActionTypes.SET_POSSIBLE_ROLES:
			const roles = action.payload as Interfaces.IPlayerRole[];
      return {
				...state,
				possibleRoles: roles
			};
    case ActionTypes.SET_ROLE:
			const role = action.payload as string;
      return {
				...state,
				role: role
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
    case ActionTypes.SET_ACTIVE_PLAYER:
      const activePlayer = action.payload as string;
      return {
        ...state,
        activePlayer: activePlayer
      }
    default:
      return state;
  }
}

export default RootReducer;
