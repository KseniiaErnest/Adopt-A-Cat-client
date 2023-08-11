import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

export default function UserProfile() {
  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [preferredSpecies, setPreferredSpecies] = useState('');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

   // Get the token from the localStorage
   const storedToken = localStorage.getItem('authToken');
  return (
    <div>
      <form>
      <input type='text' name='username' value={username} onChange={(e) => setUserName(e.target.value)} />
      <input type='text' name='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <select>
        <option></option>
      </select>


      </form>
    </div>
  )
}
