import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from 'react-router-dom';
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

// Check if the user logged in
useEffect(() => {
  const checkUserIsLoggedIn = () => {
    axios.get(`${API_URL}/auth/checkLoggedIn`)
    .then((response) => {
      console.log("CheckLoggedIn response:", response.data);
      setUser(response.data.user);
      setIsLoggedIn(true);
    })
    .catch((error) => {
      console.log("CheckLoggedIn error:", error.response.data.message);
      setIsLoggedIn(false);
      navigate('/login')
      
    })
    .finally(() => {
      setIsloading(false);
    });
  };

  checkUserIsLoggedIn();
}, []);

const login = (email, password) => {
  axios.post(`${API_URL}/auth/login`, { email, password })
  .then((response) => {
    console.log("Login response:", response.data);
    setUser(response.data.user);
    setIsLoggedIn(true);
  })
  .catch((err) => {
    console.log(err.response.data.message);
  });
};

const logout = () => {
  axios.post(`${API_URL}/auth/logout`)
  .then(() => {
    setUser(null);
    setIsLoggedIn(false);
  })
  .catch((err) => {
    console.log(err.response.data.message);
  });
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };