import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserName = (e) => setUserName(e.target.value);
  const handleFullName = (e) => setFullName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Create an object representing the request body
    const requestBody = { email, password, username, fullName, role };
    // Make an axios request to the API. If the POST request is a successful redirect to the login page.
    // If the request resolves with an error, set the error message in the state.
    axios.post(`${API_URL}/auth/signup`, requestBody)
    .then((response) => {
      navigate('/');
    })
    .catch((err) => {
      const errorDescription = err.response.data.message;
      setErrorMessage(errorDescription);
    })
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>

        <label>Email:</label>
        <input type='email' name='email' value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input type='password' name='password' value={password} onChange={handlePassword} />

        <label>Username:</label>
        <input type='text' name='username' value={username} onChange={handleUserName} />

        <label>Full name:</label>
        <input type='text' name='fullName' value={fullName} onChange={handleFullName} />

        <label>Role:</label>
        <select id='role' value={role} onChange={handleRole}>
          <option value=''>Please, select one</option>
          <option value='Adopter'>Adopter</option>
          <option value='Cat Owner'>Cat Owner</option>
        </select>

        <button type='submit'>Sign Up</button>

        {errorMessage && <p>{errorMessage}</p>}

        <p>Already have account?</p>
        <Link to={'/login'} >Login</Link>

      </form>
    </div>
  )
}
