import { SET_ROOM } from "./ActionTypes"

export const setRoom = (code: string) => ({
  type: SET_ROOM,
  payload: {
    code
  }
});
