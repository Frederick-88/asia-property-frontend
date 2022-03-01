import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import UsersReducer from "./UsersReducer";
import AdminReducer from "./AdminReducer";

const combineReducer = combineReducers({
  LoginReducer,
  UsersReducer,
  AdminReducer,
});

export default combineReducer;
