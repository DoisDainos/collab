import { SET_ROOM, ADD_PLAYER } from "./ActionTypes"

const Actions = {
  setRoom: (room: string) => {
    return {
      type: SET_ROOM,
      payload: room
    }
  },

  setPlayers: (names: string[]) => {
    return {
      type: ADD_PLAYER,
      payload: names
    }
  }
}

export default Actions;
