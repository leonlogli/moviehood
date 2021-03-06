import React from "react";
import ReactDOM from "react-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { rrfProps } from "./store";
import { AuthIsLoaded } from "./modules/auth";

import "./assets/scss/index.scss";

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </PersistGate>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,

  document.getElementById("root")
);
