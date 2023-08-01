// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function LandingPage() {
//   const navigate = useNavigate();

//   // Function to handle navigation to the Cats page
//   const handleCats = () => {
//     // Navigate to the '/home' route with the species query parameter set to 'Cat'
//     navigate('/home?species=Cat');
    
//   };

//   // Navigate to the '/home' route with the species query parameter set to 'Dog'
//   const handleDogs = () => {
//  navigate('/home?species=Dog');
//   }
  
//   return (
//     <div>
//       <h1>Welcome to Adopt a Pet!</h1>
//       <h2>Please choose a pet to adopt:</h2>
//       <div>
//         <button onClick={handleCats}>Cats</button>
//         <button onClick={handleDogs}>Dogs</button>
//       </div>
//     </div>
//   )
// }

////////////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpecies } from '../context/Species.context';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setSpecies } = useSpecies();

  const handleCats = () => {
    setSpecies('Cat'); // Set species in context state
    navigate('/home'); // Navigate to the '/home' route without the species parameter
  };

  const handleDogs = () => {
    setSpecies('Dog'); // Set species in context state
    navigate('/home'); // Navigate to the '/home' route without the species parameter
  };

  return (
    <div>
      <h1>Welcome to Adopt a Pet!</h1>
      <h2>Please choose a pet to adopt:</h2>
      <div>
        <button onClick={handleCats}>Cats</button>
        <button onClick={handleDogs}>Dogs</button>
      </div>
    </div>
  );
}