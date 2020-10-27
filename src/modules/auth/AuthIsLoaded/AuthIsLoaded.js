import React from "react";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

import { Logo } from "../../../components";

import "./AuthIsLoaded.scss";

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase?.auth);

  if (!isLoaded(auth))
    return (
      <div className="LogoBox w-100 d-flex justify-content-center align-items-center">
        <Logo fill="#111" height={56} />
      </div>
    );

  return children;
};

export { AuthIsLoaded };
export default AuthIsLoaded;
