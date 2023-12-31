import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const storeToken = (token) => { 
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => { 
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);

      setRole(decodedToken.role);
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
        console.log("AuthUser:", user);
       // Update state variables        
        setIsLoggedIn(true);
        setIsloading(false);
        setUser(user);        
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setIsLoggedIn(false);
        setIsloading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsloading(false);
        setUser(null);      
    }   
  };

  const removeToken = () => {   
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => { 
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();

    navigate('/');
  };

 
  
  useEffect(() => {                                      
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser, role, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };