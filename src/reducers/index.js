import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import UsersReducer from "./UsersReducer";

const combineReducer = combineReducers({
  LoginReducer,
  UsersReducer,
});

export default combineReducer;
