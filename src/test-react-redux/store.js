import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
export const StoreName = "part";

function middleware1() {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      console.log("log1");
      next(action);
    };
}
function middleware2() {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      console.log("log2");
      next(action);
    };
}
// https://github.com/reduxjs/redux-devtools/tree/main/extension#installation
// 此文件仅独立运行用到

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(middleware1(), middleware2())
  // other store enhancers if any
);
export const store = createStore(
  combineReducers({
    plugins: combineReducers({
      [StoreName]: rootReducer,
    }),
  }),
  // process.env.NODE_ENV !== "production" &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__()
  enhancer
);
