import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import errors from "./errors";

export default history =>
  combineReducers({
    auth,
    errors,
    router: connectRouter(history)
  });
