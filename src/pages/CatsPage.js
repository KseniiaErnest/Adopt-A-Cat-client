import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Filter from '../components/Filter';

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function CatsPage() {
  const [cats, setCats] = useState([]);

  // States for filter to keep track
  const [ageCategory, setAgeCategory] = useState('');


  const getAllCats = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
  
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/cats`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Calculate the age category for each cat
        const catsWithAgeCategory = response.data.allCats.map((cat) => ({
          ...cat,
          ageCategory: calculateCatsAge(cat.age),
        }));
  
        // Set the cats state with the calculated age categories
        setCats(catsWithAgeCategory);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllCats();
  }, []);

// Finction to calculate cat's age based on the birthdate, and the function is needed to make age categories for dropdown menu and filter
  const calculateCatsAge = (birthdate) => {
    const currentDate = new Date();
    const catBirthdate = new Date(birthdate);
  
    const monthsDifference =
      (currentDate.getFullYear() - catBirthdate.getFullYear()) * 12 +
      (currentDate.getMonth() - catBirthdate.getMonth());
  
      if (monthsDifference <= 12) {
        return 'Kitten';
      } else if (monthsDifference >= 13 && monthsDifference < 61) {
        return 'Young adult';
      } else if (monthsDifference >= 61 && monthsDifference <= 96) {
        return 'Adult';
      } else {
        return 'Senior';
      }
  };



  // Function to handle age category change in the dropdown menu (onChange);
  // Triggered when the user selects an option, update ageCategory state
  const handleAgeCategoryChange = (event) => {
    setAgeCategory(event.target.value);
  };

 


  return (
    <div className='all-cats--page' >
      <Filter cats={cats} ageCategory={ageCategory} handleAgeCategoryChange={handleAgeCategoryChange} />
    </div>
  )
}



