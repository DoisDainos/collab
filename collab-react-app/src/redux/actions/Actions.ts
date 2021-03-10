import { SET_ROOM, ADD_PLAYER, SET_PLAYING, ADD_LINES } from "./ActionTypes";
import { ILine } from "../../interfaces/Interfaces";

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
  },

  setPlaying: (playing: boolean) => {
    return {
      type: SET_PLAYING,
      payload: playing
    }
  },

  addLines: (lines: ILine[]) => {
    return {
      type: ADD_LINES,
      payload: lines
    }
  }
}

export default Actions;
