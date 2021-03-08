import { createStore } from "redux"

const initialState = {
    room: ""
};

function rootReducer(state = initialState, action: { type: string, value: any }) {
    switch (action.type) {
        case "something":
            return { ...state, value: action.value };
        default:
            return state;
    }
}

export class StoreManager {

}

export const store = createStore(rootReducer);
