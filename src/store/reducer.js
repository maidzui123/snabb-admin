import { produce } from "immer";
import { SET_TOKEN, SET_AUTH, SET_PERMISSIONS, USER_LOGOUT } from "./actions";

export const initialState = {
  auth: null,
  token: "",
  permissions: [],
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case SET_AUTH: {
        draft.auth = payload;
        break;
      }

      case SET_TOKEN: {
        draft.token = payload;
        break;
      }

      case SET_PERMISSIONS: {
        draft.permissions = payload;
        break;
      }
      case USER_LOGOUT: {
        for (const i of Object.keys(draft)) {
          draft[i] = initialState[i];
        }
        break;
      }

      default: {
        return state;
      }
    }
  });
export default reducer;
