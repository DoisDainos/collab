import * as ActionTypes from "./ActionTypes";
import { ILineFromPlayer, IPlayerRole } from "../../interfaces/Interfaces";

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

  setPlayerColour: (playerName: string, colour: string) => {
    return {
      type: ActionTypes.SET_PLAYER_COLOUR,
      payload: {
        playerName: playerName,
        colour: colour
      }
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

  addLines: (lines: ILineFromPlayer[]) => {
    return {
      type: ActionTypes.ADD_LINES,
      payload: lines
    }
  },

  setActivePlayer: (currentPlayerPosition: number) => {
    return {
      type: ActionTypes.SET_ACTIVE_PLAYER,
      payload: currentPlayerPosition
    }
  },

  setGameWord: (word: string) => {
    return {
      type: ActionTypes.SET_GAME_WORD,
      payload: word
    }
  }
}

export default Actions;
