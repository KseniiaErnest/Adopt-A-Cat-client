
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function LoginPage( {closeModal} ) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

const navigate = useNavigate();

const { storeToken, authenticateUser } = useContext(AuthContext); 

const handleEmail = (e) => setEmail(e.target.value);
const handlePassword = (e) => setPassword(e.target.value);

const handleLoginSubmit = (e) => {
  e.preventDefault();

  const requestBody = { email, password };

  axios.post(`${API_URL}/auth/login`, requestBody)
  .then((response) => {
    console.log('JWT token', response.data.authToken );

    storeToken(response.data.authToken);
    
    authenticateUser();


    navigate('/');
    closeModal();
  })
  .catch((err) => {
    const errorDescription = err.response.data.message;
    setErrorMessage(errorDescription);
  })
};

  return (
    <div className='modalBackground'>
    <div className='modalContainer'>



    <h1>Login</h1>

<form className='login-container' onSubmit={handleLoginSubmit}>

<button className='close-login-btn' onClick={closeModal}> X </button>
<div className='login-form'>
  <label>Email:</label>
  <input type='email' name='email' value={email} onChange={handleEmail} />

  <label>Password:</label>
  <input type='password' name='password' value={password} onChange={handlePassword} />

  

  </div>

  <button className='login-btn' type='submit'>Login</button>

  {errorMessage && <p>{errorMessage}</p>}

  <p>Don't have an account yet?</p>
  <Link className='sign-up-link' to={'/signup'} onClick={closeModal} >Sign Up</Link>

</form>

</div>
    </div>
  )
}






