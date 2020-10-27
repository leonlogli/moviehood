import React from "react";

import Copyright from "../components/Copyright";
import Header from "../components/Header";
import Meta from "../components/Meta/Meta";

import "./Layout.scss";

const Layout = ({ children }) => (
  <div className="Layout" id="Layout">
    <Meta />
    <Header />
    <main>{children}</main>
    <footer className="w-100 text-center">
      <Copyright className="m-3" />
    </footer>
  </div>
);

export { Layout };
export default Layout;
