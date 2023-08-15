import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function LocationsPage() {

  const [locations, setLocations] = useState([]);

  // Search state
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    const newSearch = e.target.value;
    setSearchInput(newSearch);
  }

  const filteredLocations = locations.filter((oneLocation) => oneLocation.name.toLowerCase().includes(searchInput.toLowerCase()))

   // Get the token from the localStorage
   const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
  const getAllLocations = () => {
    axios.get(`${API_URL}/locations`,  { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => setLocations(response.data.allLocations))
    .catch((err) => console.log(err))
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  return (
    <div>
    <h1 className='big-heading'>Pet's Shelters</h1>

    <input className='search-bar' type='text' onChange={(e) => handleSearch(e)} placeholder='Search' />

    <div className='locations-container'>
       
      {filteredLocations.map((location) => {
        return (
<div className='location-box' key={location._id}>
<img src='/icons8-heart-with-dog-paw-48.png' alt='cat icon' />
<Link className='cat-box-link' to={`/locations/${location._id}`}><h2>{location.name}</h2></Link>
</div>
        )
      })}
      
    </div>
    </div>
  )
}
