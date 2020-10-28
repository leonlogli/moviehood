import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFirebase, isEmpty } from "react-redux-firebase";
import { Navbar, Nav, Button, NavDropdown, Image } from "react-bootstrap";

import { useSelector } from "react-redux";
import { authSelector } from "../../../modules/auth";
import { SearchForm } from "../../../modules/search";
import { movieCollections } from "../../../api";
import { useMediaQuery } from "../../../hooks";
import { Logo } from "../../../components";

import "./Header.scss";

const Header = () => {
  const history = useHistory();
  const firebase = useFirebase();

  const currentUser = useSelector(authSelector);
  const onMobile = useMediaQuery("(max-width: 768px)");

  const handleLogout = () => {
    history.push("/");
    firebase.logout();
    localStorage.clear();
  };

  return (
    <Navbar className="Header" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <Logo fill="#333" height={26} className="mr-1" /> MovieHood
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <NavDropdown title="Browse" id="basic-nav-dropdown">
            {Object.keys(movieCollections).map((col) => (
              <NavDropdown.Item key={col} as={Link} to={"/movies/" + col}>
                {movieCollections[col]}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <Nav.Link as={Link} to="/favorites">
            My Favorites
          </Nav.Link>
        </Nav>
        <SearchForm className="mb-3 mt-2 m-md-0" open={onMobile} />
        {isEmpty(currentUser) && (
          <>
            <Button variant="outline-success" as={Link} to="/login">
              Login
            </Button>
          </>
        )}
        {!isEmpty(currentUser) && (
          <>
            {currentUser.photoURL && (
              <Image src={currentUser.photoURL} roundedCircle />
            )}
            <Button variant="outline-primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export { Header };
export default Header;
