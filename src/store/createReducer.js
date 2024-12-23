import { combineReducers } from "redux";
import appReducer from "../store/reducer";

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    appState: appReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
