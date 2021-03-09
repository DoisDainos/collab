import { createStore } from "redux";
import RootReducer from "../reducers/RootReducer";

export const createPlayerStore = () => {
  return createStore(RootReducer);
}
