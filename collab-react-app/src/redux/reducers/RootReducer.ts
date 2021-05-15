import * as Interfaces from "../../interfaces/Interfaces";
import * as ActionTypes from "../actions/ActionTypes";

type IReducerFunction = (
  state: Interfaces.IPlayerState | undefined,
  action: Interfaces.IStringAction | Interfaces.IStringArrayAction | Interfaces.IBooleanAction | Interfaces.ILinesAction | Interfaces.IRolesAction | Interfaces.IPlayerPositionMapAction
) => Interfaces.IPlayerState;

const initialState: Interfaces.IPlayerState = {
  room: "",
  name: "",
  players: {},
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
      const players: Interfaces.IPlayerPositionMap = {};
      for (const name of names) {
        // Default position as -1
        players[name] = -1;
      }
      return {
				...state,
				players: players
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
    case ActionTypes.SET_PLAYER_ORDER:
      const playerPositionMap = action.payload as Interfaces.IPlayerPositionMap;
      return {
        ...state,
        players: playerPositionMap
      }
    default:
      return state;
  }
}

export default RootReducer;
