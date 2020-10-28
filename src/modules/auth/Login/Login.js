import React from "react";
import { useFirebase, isEmpty } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import { authSelector } from "../../../modules/auth";

import "./Login.scss";

function Login() {
  const history = useHistory();
  const firebase = useFirebase();

  const currentUser = useSelector(authSelector);
  const isAuth = !isEmpty(currentUser);

  if (isAuth) {
    history.push("/");
  }

  return (
    <div className="Login container-fluid h-100">
      <Helmet>
        <title>Login - MovieHood</title>
      </Helmet>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "popup",
          signInSuccessUrl: "/",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
          ],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              firebase.handleRedirectResult(authResult).then(() => {
                history.push("/");
              });
              return false;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
}

export { Login };
export default Login;
