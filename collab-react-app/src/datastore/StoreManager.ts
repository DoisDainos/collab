import { createStore } from "redux"
import { SET_ROOM } from "../actions/ActionTypes"

export interface IStringAction {
  type: string,
  payload: string
}

export interface IPlayerState {
  room: string,
  otherPlayers: string[]
}

const initialState: IPlayerState = {
  room: "",
  otherPlayers: []
};

function rootReducer(state = initialState, action: IStringAction): IPlayerState {
  switch (action.type) {
    case SET_ROOM:
      const code = action.payload;
      return { ...state, room: code };
    default:
      return state;
  }
}

export const createPlayerStore = () => {
  return createStore(rootReducer);
}
