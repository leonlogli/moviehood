import React from "react";

import Copyright from "../components/Copyright";
import Header from "../components/Header";

import "./Layout.scss";

const Layout = ({ children }) => (
  <div className="Layout" id="Layout">
    <Header />
    <main>{children}</main>
    <footer className="w-100 text-center">
      <Copyright className="m-3" />
    </footer>
  </div>
);

export { Layout };
export default Layout;
