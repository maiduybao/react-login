import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";

const middleware = applyMiddleware(promise(), thunk, logger);
const preloadedState = {};
const store = createStore(rootReducer, preloadedState, middleware);
export default store;