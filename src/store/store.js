/**
 * Create the store with dynamic reducers
 */
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import createReducer from "./createReducer";
import { persistStore, persistReducer } from "redux-persist";
import Cookies from "cookies-js";
import session from "redux-persist/lib/storage/session"; // defaults to localStorage for web
import AsyncStorage from "@react-native-async-storage/async-storage";

const middlewares = [thunk];
const initialState = {};

var enhancer = applyMiddleware(...middlewares);

/* istanbul ignore next */
if (import.meta.env.NODE_ENV !== "production" && typeof window === "object") {
  enhancer = composeWithDevTools(enhancer);
}
const reducer = createReducer();
const rootReducer = persistReducer(
  {
    key: "root",
    storage: session || AsyncStorage,
    // storage: new CookieStorage(Cookies/*, options */),
    // stateReconciler(inboundState, originalState) {
    // Ignore state from cookies, only use preloadedState from window object
    //   return originalState
    // }
    // whitelist: STORAGE_MODULES,
  },
  reducer
);
const store = createStore(rootReducer, initialState, enhancer);
const persist = persistStore(store);

// Extensions
store.injectedReducers = {}; // Reducer registry

// Make reducers hot reloadable, see http://mxs.is/googmo
/* istanbul ignore next */
// if (module["hot"]) {
//   module["hot"].accept("./createReducer.js", () => {
//     store.replaceReducer(createReducer(store.injectedReducers));
//   });
// }

export { store, persist };
