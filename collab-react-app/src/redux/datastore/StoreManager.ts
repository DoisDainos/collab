import { createStore } from "redux";
import RootReducer from "../reducers/RootReducer";

export const createPlayerStore = () => {
  return createStore(RootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
}
