import { combineReducers } from "redux";
import users from "./reducer";

const reducers = combineReducers({
  users,
});

export default reducers;
