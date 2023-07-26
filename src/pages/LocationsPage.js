import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:5005";

export default function LocationsPage() {

  const [locations, setLocations] = useState([]);

  const getAllLocations = () => {
    axios.get(`${API_URL}/locations`)
    .then((response) => setLocations(response.data.allLocations))
    .catch((err) => console.log(err))
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  return (
    <div className='locations-container'>
    <h1 className='big-heading'>Cats Owners</h1>
    <ul>
      {locations.map((location) => {
        return (
<div className='location-box' key={location._id}>
<img src='/icons8-cat-62.png' alt='cat icon' />
<Link className='cat-box-link' to={`/locations/${location._id}`}><h2>{location.name}</h2></Link>
</div>
        )
      })}
      </ul>
    </div>
  )
}