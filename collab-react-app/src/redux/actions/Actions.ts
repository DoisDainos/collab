import * as ActionTypes from "./ActionTypes";
import { ILine } from "../../interfaces/Interfaces";

const Actions = {
  setRoom: (room: string) => {
    return {
      type: ActionTypes.SET_ROOM,
      payload: room
    }
  },

  setName: (name: string) => {
    return {
      type: ActionTypes.SET_NAME,
      payload: name
    }
  },

  setPlayers: (names: string[]) => {
    return {
      type: ActionTypes.ADD_PLAYER,
      payload: names
    }
  },

  setPlaying: (playing: boolean) => {
    return {
      type: ActionTypes.SET_PLAYING,
      payload: playing
    }
  },

  addLines: (lines: ILine[]) => {
    return {
      type: ActionTypes.ADD_LINES,
      payload: lines
    }
  }
}

export default Actions;
