import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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
        <h2>{locationDetails.name}</h2>
        <p className='cat-details-about'>{locationDetails.description}</p>
        <p><span>Address:</span> {locationDetails.address}</p>
        <p><span>Phone number:</span> {locationDetails.phoneNumber}</p>
        <p><span>Email:</span> {locationDetails.email}</p>
        <p><span>Open hours:</span> {locationDetails.openingHours}</p>
        <p><span>Website:</span> {locationDetails.website}</p>
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
              <div key={cat._id}>
              <figure className='gallery-item' >
              <Link to={`/cats/${cat._id}`}><img src={cat.images[0]} alt='Cat pic' /></Link>
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
