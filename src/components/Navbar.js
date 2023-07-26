import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  // Subscribe to the AuthContext to gain access to the values from AuthContext.Provider `value` prop.
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  //  Update the rendering logic to display different content depending on whether the user is logged in or not
  return (
    <nav className="navbar-container">
      <img className="cat-logo-img" src="/catlogo3.png" alt="cat logo" />

      <Link className="navbar-link-box" to="/">
        Home
      </Link>

      {isLoggedIn && (
        <>
          <Link className="navbar-link-box" to="/cats">
            Cats
          </Link>

          <Link className="navbar-link-box" to="/cats/add-a-cat">
            Add a Cat
          </Link>

          <Link className="navbar-link-box" to="/locations">
            Cats Owners
          </Link>

          <Link className="navbar-link-box" to="/locations/add-a-location">
            Add a Location
          </Link>

          {user && <span>{user.fullName}</span>}
          <button onClick={logout}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link className="navbar-link-box" to="/signup">
            Sign Up
          </Link>

          <Link className="navbar-link-box" to="/login">
            Login
          </Link>
        </>
      )}
    </nav>
  );
}
