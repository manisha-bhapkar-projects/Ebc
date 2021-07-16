import { combineReducers } from "redux";

const appReducer = combineReducers({
  user: "",
  admin: "",
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
