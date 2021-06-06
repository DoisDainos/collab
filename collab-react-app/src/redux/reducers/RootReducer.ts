import * as Interfaces from "../../interfaces/Interfaces";
import * as ActionTypes from "../actions/ActionTypes";

type IReducerFunction = (
  state: Interfaces.IPlayerState | undefined,
  action: any
) => Interfaces.IPlayerState;

const initialState: Interfaces.IPlayerState = {
  room: "",
  name: "",
  players: [],
  playerColourMap: {},
  activePlayer: "",
  canvasLines: [],
  playing: false,
  role: "",
  possibleRoles: [],
  gameWord: "",
  guessingPlayer: "",
  time: -1,
  guessedSpy: false,
  gameEnded: false,
  spy: "",
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
    case ActionTypes.SET_PLAYER_COLOUR:
			const playerName = (action.payload as Interfaces.IPlayerColourAction).playerName;
      const colour = (action.payload as Interfaces.IPlayerColourAction).colour;
      return {
				...state,
				playerColourMap: {
          ...state.playerColourMap,
          [playerName]: colour
        }
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
    case ActionTypes.SET_TIME:
      const time = action.payload as number;
      return {
        ...state,
        time: time
      }
    case ActionTypes.ADD_LINES:
      const lines = action.payload as Interfaces.ILineFromPlayer[];
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
    case ActionTypes.SET_GAME_WORD:
      const word = action.payload as string;
      return {
        ...state,
        gameWord: word
      }
    case ActionTypes.SET_GUESSING:
      const guessingPlayer = (action.payload as Interfaces.ISetGuessingAction).playerName;
      const isGuessing = (action.payload as Interfaces.ISetGuessingAction).guessing;
      return {
        ...state,
        guessingPlayer: isGuessing ? guessingPlayer : ""
      }
    case ActionTypes.SET_CORRECT_GUESS:
      const guessedSpy = action.payload as boolean;
      return {
        ...state,
        guessedSpy: guessedSpy
      }
    case ActionTypes.END_GAME:
      const spy = action.payload as string;
      return {
        ...state,
        gameEnded: true,
        spy: spy
      }
    case ActionTypes.SET_STATE:
      const partialState = action.payload as Partial<Interfaces.IPlayerState>;
      return {
        ...state,
        ...partialState
      }
    default:
      return state;
  }
}

export default RootReducer;
