import * as ActionTypes from "./ActionTypes";
import { ILineWithStyle, IPlayerPositionMap, IPlayerRole } from "../../interfaces/Interfaces";

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

  setPossibleRoles: (roles: IPlayerRole[]) => {
    return {
      type: ActionTypes.SET_POSSIBLE_ROLES,
      payload: roles
    }
  },

  setRole: (role: string) => {
    return {
      type: ActionTypes.SET_ROLE,
      payload: role
    }
  },

  setPlaying: (playing: boolean) => {
    return {
      type: ActionTypes.SET_PLAYING,
      payload: playing
    }
  },

  addLines: (lines: ILineWithStyle[]) => {
    return {
      type: ActionTypes.ADD_LINES,
      payload: lines
    }
  },

  setPlayerOrder: (playerPositionMap: IPlayerPositionMap) => {
    return {
      type: ActionTypes.SET_PLAYER_ORDER,
      payload: playerPositionMap
    }
  }
}

export default Actions;
