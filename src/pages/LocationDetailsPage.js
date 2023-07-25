import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const API_URL = "http://localhost:5005";

export default function LocationDetailsPage() {

  const [locationDetails, setLocationDetails] = useState(null);

  // Get the URL parameter ':catId':
  const { locationId } = useParams();

  // Helper function that makes a GET request to the API and retrieves the location by id
const getLocationDetails = () => {
  axios.get(`${API_URL}/locations/${locationId}`)
  .then((response) => {
    setLocationDetails(response.data.oneLocation);
  })
  .catch((err) => console.log(err));
};

useEffect(() => {
  getLocationDetails();
}, [] );


  return (
    <div className='section'>
    {locationDetails && (
      <div className='home-grid'>

      <div className='cat-details-info-box'>
        <h2>Name: {locationDetails.name}</h2>
        <p>Address: {locationDetails.address}</p>
        <p>Phone number: {locationDetails.phoneNumber}</p>
        <p>Email: {locationDetails.email}</p>
        <p>Open hours: {locationDetails.openingHours}</p>
        <p>Website: {locationDetails.website}</p>
        <p>About: {locationDetails.description}</p>
        <div className='btn-container'>
        <Link to='/locations'><button className='btn-all back-button'>Back</button></Link>
    <Link to={`/locations/edit/${locationId}`}><button className='btn-all edit-button'>Edit or Delete</button></Link>
    </div>
        </div>
<div className='cats-photo-container'>
        <p>Cats:</p>
        <div>
        <ul>
          {locationDetails.cats.map((cat) => {
            return (
              <div key={cat._id}>
              <p>{cat.name}</p>
              <img src={cat.image[0]} alt='Cat pic' />
              </div>
            )
           
          })}
        </ul>
        </div>

        </div>

      </div>
    )}

      
    </div>
  )
}
