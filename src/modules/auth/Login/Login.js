import React from "react";
import { useFirebase } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const firebase = useFirebase();

  return (
    <div>
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
                history.push(redirectUrl);
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