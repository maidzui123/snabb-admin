import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectAppState = (state) => {
  return state.appState || initialState;
};
const makeSelectAuth = () =>
  createSelector(selectAppState, (substate) => substate.auth);

const makeSelectToken = () =>
  createSelector(selectAppState, (substate) => substate.token);

const makerSelectPermissions = () =>
  createSelector(selectAppState, (substate) => substate.permissions);

export { makeSelectAuth, makeSelectToken, makerSelectPermissions };
