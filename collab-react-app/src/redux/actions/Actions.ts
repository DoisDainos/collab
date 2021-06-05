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

  setTime: (time: number) => {
    return {
      type: ActionTypes.SET_TIME,
      payload: time
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
  },

  startGuess: (player: string) => {
    return {
      type: ActionTypes.SET_GUESSING,
      payload: {
        playerName: player,
        guessing: true
      }
    }
  },

  endGuess: () => {
    return {
      type: ActionTypes.SET_GUESSING,
      payload: {
        guessing: false
      }
    }
  },

  submitGuess: (correct: boolean) => {
    return {
      type: ActionTypes.SET_CORRECT_GUESS,
      payload: correct
    }
  },

  endGame: (spy: string) => {
    return {
      type: ActionTypes.END_GAME,
      payload: spy
    }
  }
}

export default Actions;
