import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const API_URL = "http://localhost:5005";

export default function CatDetailsPage() {

  const [catDetails, setCatDetails] = useState(null);

  // Get the URL parameter ':catId':
  const { catId } = useParams();

  // Helper function that makes a GET request to the API and retrieves the cat by id
  const getCatDetails = () => {
    axios.get(`${API_URL}/cats/${catId}`)
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

  return (
    <div>
      {catDetails && (
        <div>
          <h2>Cat's name: {catDetails.name}</h2>
          <p>Date of birth: {formattedDate(catDetails.age)}</p>
          <p>Sex: {catDetails.gender}</p>
          <color>Color: {catDetails.color}</color>
          <p>About: {catDetails.description}</p>
          <p>Status: {catDetails.availability}</p>
          <img className='cat-box-img' src={catDetails.images} alt='Photos of the cat' />
          <p>Date of entry in the system: {formattedDate(catDetails.dateOfEntry)}</p>
          <p>Belong to: {catDetails.location.name}</p>
        </div>
      )}

      <Link to='/cats'><button>Back to cats list</button></Link>
      <Link to={`/cats/edit/${catId}`} ><button>Edit or Delete Cat</button></Link>

    </div>
  )
}
