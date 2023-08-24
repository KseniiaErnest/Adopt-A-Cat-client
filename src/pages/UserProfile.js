import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

export default function UserProfile( {closeModal} ) {
  const { user } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);

  console.log('User for AuthContext:', user);

  const [username, setUserName] = useState(user.username);
  const [fullName, setFullName] = useState(user.fullName);
  const [preferredSpecies, setPreferredSpecies] = useState(user.preferredSpecies);

  const navigate = useNavigate();
  

   // Get the token from the localStorage
   const storedToken = localStorage.getItem('authToken');

const handleFormSubmitUser = (e) => {
e.preventDefault();

const requestBody = { username, fullName, preferredSpecies};
const userId = user._id;

axios.put(`${API_URL}/auth/${userId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
.then((response) => {
  setUser(response.data.UserToUpdate);
  console.log('User profile updated successfully:', response.data);
  navigate('/');
  closeModal();
})
.catch((err) => console.log(err))
};

return (
  <div className='modalBackground'>
  <div className='modalContainer'>
    <form className='user-from' onSubmit={handleFormSubmitUser}>
    <button className='close-login-btn' onClick={closeModal}> X </button>
    <div className='user-box'>

    <label>Username:</label>
    <input type='text' name='username' value={username} onChange={(e) => setUserName(e.target.value)} />
    <label>Full name:</label>
    <input type='text' name='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)} />
    <label>Change pet type:</label>
    <select id='preferredSpecies' value={preferredSpecies} onChange={(e) => setPreferredSpecies(e.target.value)}>
  <option value='Cat'>Cat</option>
    <option value='Dog'>Dog</option>
      </select>
      <label>Your pet type: {preferredSpecies}</label>

      </div>


<button className='login-btn' type='submit'>Save</button>
    </form>
  </div>
  </div>
)
}

