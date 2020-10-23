import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./modules";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { getFirebase } from "react-redux-firebase";

import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

const isProdEnv = process.env.NODE_ENV === "production";

const middlewares = [thunk.withExtraArgument(getFirebase)];

if (!isProdEnv) {
  middlewares.push(require("redux-logger").default);
}

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = isProdEnv
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);

/**
 * react-redux-firebase props
 */
export const rrfProps = {
  firebase,
  config: { userProfile: "users" },
  dispatch: store.dispatch,
};

export const persistor = persistStore(store);
