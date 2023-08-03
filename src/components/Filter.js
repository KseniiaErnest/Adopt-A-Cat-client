import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Filter({ cats, ageCategory, handleAgeCategoryChange }) {
  // State for search
  const [searchInput, setSearchInput] = useState('');

  const [gender, setGender] = useState('');

   // Function to handle gender change in the dropdown menu (onChange);
   // Triggered when the user selects an option, update gender state
   const handleGenderChange = (e) => {
    setGender(e.target.value);
  }; 


  // Search handle
const handleSearch = (e) => {
  const newSearch = e.target.value;
  setSearchInput(newSearch);
}

  // The variable to hold filtered results
  const filteredCats = 
  (ageCategory ? cats.filter((cat) => cat.ageCategory === ageCategory) : cats)
  .filter((cat) => (!gender || cat.gender === gender))
  .filter((cat) => cat.name.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <div>

    <div className='filter-search-container'>

    <div>
      <label>
        Age Filter:
        <select value={ageCategory} onChange={handleAgeCategoryChange}>
          <option value=''>All</option>
          <option value='Kitten'>Kitten</option>
          <option value='Young adult'>Young adult</option>
          <option value='Adult'>Adult</option>
          <option value='Senior'>Senior</option>
        </select>
      </label>

      <label>
        Gender filter:
        <select value={gender} onChange={handleGenderChange}>
          <option value=''>All</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
      </label>

      </div>

      <input className='search-bar' type='text' onChange={(e) => handleSearch(e)} placeholder='Search' />

      </div>

      <div className='cats-page-container' >
      {filteredCats.map((cat) => {
          return (
            <div className='cat-box' key={cat._id}>
              <img className='cat-box-img' src={cat.images[0]} alt='Cat intro pic' />
              <div className='cat-box-link-and-img'>
                <img className='paw-icon' src='/icons8-cat-footprint-50.png' alt='Cat paw icon' />
                <Link className='cat-box-link' to={`/cats/${cat._id}`}>
                  <h2>{cat.name}</h2>
                </Link>
                <img className='paw-icon' src='/icons8-cat-footprint-50.png' alt='Cat paw icon' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
