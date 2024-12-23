export const SET_ORDER = "[APP] SET_ORDER";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const SET_AUTH = "[APP] SET_AUTH";
export const CLEAR_AUTH = "[APP] CLEAR_AUTH";
export const SET_PERMISSIONS = "SET_PERMISSIONS";
export const USER_LOGOUT = "USER_LOGOUT";

export const setAuth = (payload) => ({ type: SET_AUTH, payload });
export const userLogout = (payload) => ({ type: USER_LOGOUT, payload });
export const setToken = (payload) => ({ type: SET_TOKEN, payload });
export const setPermissions = (payload) => ({ type: SET_PERMISSIONS, payload });
