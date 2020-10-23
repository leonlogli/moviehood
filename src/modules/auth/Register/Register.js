import React from "react";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);

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
      <div>
        <h2>Login</h2>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          <span>Not Authed</span>
        ) : (
          <pre>{JSON.stringify(auth, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export { Register };
export default Register;
