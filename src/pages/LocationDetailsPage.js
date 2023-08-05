import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

export default function LocationDetailsPage() {

  const [locationDetails, setLocationDetails] = useState(null);

  // Get the URL parameter ':locationId':
  const { locationId } = useParams();
  const { user } = useContext(AuthContext);

  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  // Helper function that makes a GET request to the API and retrieves the location by id;
  // Send the token through the request "Authorization" Headers
const getLocationDetails = () => {
  axios.get(`${API_URL}/locations/${locationId}`,  { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((response) => {
    setLocationDetails(response.data.oneLocation);
  })
  .catch((err) => console.log(err));
};

useEffect(() => {
  getLocationDetails();
}, [] );

// Check if the user is associated with this location
const isUserAssociatedWithLocation = locationDetails && locationDetails.createdBy === user?._id;
// The symbol '?' in 'user?._id' is a optional chaining operator (ECMAScript2020) = locationDetails && locationDetails.createdBy === user && user._id;

  return (
    <div className='section'>
    {locationDetails && (
      <div className='home-grid grid--start'>

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

        { isUserAssociatedWithLocation && (
          <Link to={`/locations/edit/${locationId}`}><button className='btn-all edit-button'>Edit or Delete</button></Link>
        )}

    </div>
        </div>

<div className='cats-photo--gallery'>

        
          {locationDetails.cats.map((cat) => {
            return (
              <div>
              <figure className='gallery-item' key={cat._id}>
              <img src={cat.images[0]} alt='Cat pic' />
              </figure>
              </div>
            )
           
          })}
        

</div>


      </div>
    )}

      
    </div>
  )
}
