import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  // Function to handle navigation to the Cats page
  const handleCats = () => {
    // Navigate to the '/home' route with the species query parameter set to 'Cat'
    navigate('/home/Cat');
  };

  // Navigate to the '/home' route with the species query parameter set to 'Dog'
  const handleDogs = () => {
navigate('/home/Dog');
  }
  
  return (
    <div>
      <h1>Welcome to Adopt a Pet!</h1>
      <h2>Please choose a pet to adopt:</h2>
      <div>
        <button onClick={handleCats}>Cats</button>
        <button onClick={handleDogs}>Dogs</button>
      </div>
    </div>
  )
}
