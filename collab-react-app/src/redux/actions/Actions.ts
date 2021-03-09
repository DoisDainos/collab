import { SET_ROOM, ADD_PLAYER } from "./ActionTypes";
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

  addLines: (lines: ILine[]) => {
    return {
      type: ADD_PLAYER,
      payload: lines
    }
  }
}

export default Actions;
