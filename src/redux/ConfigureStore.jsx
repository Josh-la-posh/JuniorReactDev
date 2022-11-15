import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Reducer } from "./reducer";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            reducer: Reducer,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}