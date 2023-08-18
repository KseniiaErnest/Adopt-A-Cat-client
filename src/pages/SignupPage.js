import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserName = (e) => setUserName(e.target.value);
  const handleFullName = (e) => setFullName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
console.log('Singing up');
    // Create an object representing the request body
    const requestBody = { email, password, username, fullName, role };
    console.log({ body: requestBody });
    // Make an axios request to the API. If the POST request is a successful redirect to the login page.
    // If the request resolves with an error, set the error message in the state.
    axios
      .post(`${API_URL}/auth/signup`, requestBody, { withCredentials: true  })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log({ error: err });
        const errorDescription = err.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="sign-up--grid">
      <div className="signup-container">
        <h1>Sign Up</h1>

        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <input
            className="signup-input"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
          />

          <input
            className="signup-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />

          <input
            className="signup-input"
            type="text"
            name="username"
            value={username}
            onChange={handleUserName}
            placeholder="Username"
          />

          <input
            className="signup-input"
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleFullName}
            placeholder="Full name (optional)"
          />

          <div className="signup-role-box">
            <label>Please, choose role</label>
            <select id="role" value={role} onChange={handleRole}>
              <option value="">Select one</option>
              <option value="Adopter">Adopter</option>
              <option value="Cat Owner">Cat Owner</option>
            </select>
          </div>

          <button className="btn-all btn--signup" type="submit">
            <img src="/icons8-user-64.png" alt="user sighup icon" />
            Sign Up
          </button>

          {errorMessage && <p>{errorMessage}</p>}

          <div>
            {/* <p className='signup-login-text'>Already have account?</p> */}
            {/* <Link className='login-link' to={'/login'} >Login</Link> */}
          </div>
        </form>
      </div>

      <div
        className="signup-img-container"
        style={{
          backgroundImage: "url(/cats-many.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
}
