import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import errors from "./errors";
import tasks from "./tasks";

export default history =>
  combineReducers({
    auth,
    errors,
    tasks,
    router: connectRouter(history)
  });
