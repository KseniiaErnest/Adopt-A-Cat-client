import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  // Subscribe to the AuthContext to gain access to the values from AuthContext.Provider `value` prop.
  const { isLoggedIn, user, logOutUser, role } = useContext(AuthContext);

  // Add console.log statements to check the login status
  console.log('isLoggedIn:', isLoggedIn);
  console.log('user:', user);



  //  Update the rendering logic to display different content depending on whether the user is logged in or not
  return (
    <nav className="navbar-container">

    <div className="navbar-img-user-box">
      <img className="cat-logo-img" src="/catlogo3.png" alt="cat logo" />

      {isLoggedIn && (
        <>
        {user && <span className="navbar-username">{user.username}</span>}
          <button className="logout-btn" onClick={logOutUser}>Logout</button>
        </>
      )}

      </div>
     
<div className="navbar-links-container">
      <Link className="navbar-link-box" to="/">
        Home
      </Link>

      {isLoggedIn && (
        <>
          <Link className="navbar-link-box" to="/cats">
            Cats
          </Link>

{role === 'Cat Owner' && (
  <>
  
  <Link className="navbar-link-box" to="/cats/add-a-cat">
            Add Cat
          </Link>

          <Link className="navbar-link-box" to="/locations/add-a-location">
            Add Shelter
          </Link>

          </>
)}
          

          <Link className="navbar-link-box" to="/locations">
            Pet's Shelters
          </Link>

        
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

      </div>
    </nav>
  );
}









