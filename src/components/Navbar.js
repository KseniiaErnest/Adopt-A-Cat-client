import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import '../App.css';
import LoginPage from "../pages/LoginPage";


export default function Navbar() {
  // Subscribe to the AuthContext to gain access to the values from AuthContext.Provider `value` prop.
  const { isLoggedIn, user, logOutUser, role } = useContext(AuthContext);

 // State to manage the visibility of the login modal 
  const [openModal, setOpenModal] = useState(false);

  // for mobile nav menu
  const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive--nav"
		);
	};


 // Function to close the login modal
  const handleModalClose = () => {
    setOpenModal(false);
  };

  
  // Add console.log statements to check the login status
  console.log('isLoggedIn:', isLoggedIn);
  console.log('user:', user);

  // Sticky Navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('header');
      const app = document.querySelector('.App');

      if (window.pageYOffset > 0) {
        navbar.classList.add('sticky');
        app.classList.add('scroll');
      } else {
        navbar.classList.remove('sticky');
        app.classList.remove('scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //  Update the rendering logic to display different content depending on whether the user is logged in or not
  return (
    <header>

    <div className="navbar-img-user-box">
      <img className="cat-logo-img" src="/catlogo3.png" alt="cat logo" />

      {isLoggedIn && (
        <>
        {user && <span className="navbar-username">{user.username}</span>}
          <button className="logout-btn" onClick={logOutUser}>Logout</button>
        </>
      )}

      </div>

    <nav className="navbar-container" ref={navRef}>

    
     
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

          <button className="openModalBtn" onClick={() => {setOpenModal(true)}}>Login</button>
          
          {openModal && <LoginPage closeModal={handleModalClose} />}

        </>
      )}

      </div>
      <button className="nav-mobile-btn close-nav-btn" onClick={showNavbar}> X </button>
    </nav>
    <button className="nav-mobile-btn" onClick={showNavbar}><img src="/icons8-menu-50.png" alt="icon nav menu" /></button>
    </header>

  );
}









