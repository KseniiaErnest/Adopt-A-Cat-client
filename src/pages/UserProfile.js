import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);

  console.log('User for AuthContext:', user);

  const userData = user.payload;
  console.log(userData._id);

  const [username, setUserName] = useState(userData.username);
  const [fullName, setFullName] = useState(userData.fullName);
  const [preferredSpecies, setPreferredSpecies] = useState(userData.preferredSpecies);

  const navigate = useNavigate();
  

   // Get the token from the localStorage
   const storedToken = localStorage.getItem('authToken');

const handleFormSubmitUser = (e) => {
e.preventDefault();

const requestBody = { username, fullName, preferredSpecies};
const userId = userData._id;

axios.put(`${API_URL}/auth/${userId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
.then((response) => {
  setUser(response.data.UserToUpdate);
  console.log('User profile updated successfully:', response.data);
  navigate('/');
})
.catch((err) => console.log(err))
};

return (
  <div>
    <form onSubmit={handleFormSubmitUser}>
    <input type='text' name='username' value={username} onChange={(e) => setUserName(e.target.value)} />
    <input type='text' name='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)} />
    <label>Preferred Species: {preferredSpecies}</label>
    <label>Do you want to change preferred species to:</label>
    <select id='preferredSpecies' value={preferredSpecies} onChange={(e) => setPreferredSpecies(e.target.value)}>
  <option value='Cat'>Cat</option>
    <option value='Dog'>Dog</option>
      </select>


<button type='submit'>Save</button>
    </form>
  </div>
)
}

