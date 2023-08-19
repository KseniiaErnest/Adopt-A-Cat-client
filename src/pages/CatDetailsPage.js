import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Carousel from '../components/Carousel';

const API_URL = "http://localhost:5005";

export default function CatDetailsPage() {

  const [catDetails, setCatDetails] = useState(null);

  // Get the URL parameter ':catId':
  const { catId } = useParams();
  const { user } = useContext(AuthContext);

  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  // Helper function that makes a GET request to the API and retrieves the cat by id
  // Send the token through the request "Authorization" Headers
  const getCatDetails = () => {
    axios.get(`${API_URL}/cats/${catId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      setCatDetails(response.data.oneCat)
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCatDetails();
  }, [] );

  // Function to convert date strings to formatted readable dates
  const formattedDate = (nonFormDate) => {
    return new Date(nonFormDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Check if the cat's location matches the currently logged-in user's location
  // const isUserAssociatedWithCat = user && catDetails && user.locationId === catDetails.location._id;

  return (
    <div className='section'>
      {catDetails &&  (
        <div className='home-grid cat-details--grid'>

        <div className='cat-details-info-box'>

          <h2 className='cat-details-heading'>Cat's name: <span>{catDetails.name}</span> </h2>
          <p>Date of birth: {formattedDate(catDetails.age)}</p>
          <p>Sex: {catDetails.gender}</p>
          <p>Color: {catDetails.color}</p>
          <p>About: {catDetails.description}</p>
          <p>Status: {catDetails.availability}</p>
          <p>Date of entry in the system: {formattedDate(catDetails.dateOfEntry)}</p>
          <p>Belong to: {catDetails.location.name}</p>

          <div className='btn-container'>
          <Link to='/cats'><button className='btn-all back-button'>Back to cats list</button></Link>

          {user && user._id === catDetails.location.createdBy && (
            <Link to={`/cats/edit/${catId}`} ><button className='btn-all edit-button'>Edit or Delete Cat</button></Link>
          )}
      
      </div>

      </div>

          
         
      <Carousel images={catDetails.images} />
        


        </div>
      )}

    

    </div>
  )
}
