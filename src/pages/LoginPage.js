import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const API_URL = "http://localhost:5005";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

const navigate = useNavigate();

const handleEmail = (e) => setEmail(e.target.value);
const handlePassword = (e) => setPassword(e.target.value);

const handleLoginSubmit = (e) => {
  e.preventDefault();

  const requestBody = { email, password };

  axios.post(`${API_URL}/auth/login`, requestBody)
  .then((response) => {
    console.log(response.data);
navigate('/');
  })
  .catch((err) => {
    const errorDescription = err.response.data.message;
    setErrorMessage(errorDescription);
  })
};

  return (
    <div>

    <h1>Login</h1>

<form onSubmit={handleLoginSubmit}>

  <label>Email:</label>
  <input type='email' name='email' value={email} onChange={handleEmail} />

  <label>Password:</label>
  <input type='password' name='password' value={password} onChange={handlePassword} />

  <button type='submit'>Login</button>

  {errorMessage && <p>{errorMessage}</p>}

  <p>Don't have an account yet?</p>
  <Link to={'/signup'} >Sign Up</Link>

</form>
      
    </div>
  )
}
