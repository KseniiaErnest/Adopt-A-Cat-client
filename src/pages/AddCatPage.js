import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

import { useParams, useNavigate } from 'react-router-dom';

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function AddCatPage() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [age, setAge] = useState(new Date());
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [images, setImages] = useState([]);
  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userLocations, setUserLocations] = useState([]);
  const [species, setSpecies] = useState(user.preferredSpecies);
 

 // Get the token from the localStorage
 const storedToken = localStorage.getItem('authToken');

const navigate = useNavigate();


useEffect(() => {
  axios.get(`${API_URL}/locations`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      console.log(response.data);
      const filteredLocations = response.data.allLocations.filter(location => String(location.createdBy) === String(user._id));
      setUserLocations(filteredLocations); // Save the filtered user locations in the state
      setSelectedLocation(filteredLocations[0]?._id || ''); // Set the first user's location as the initial selectedLocation
    })
    .catch((err) => console.log(err));
}, [user._id]);

const handleSubmit = (e) => {
  e.preventDefault();

  const formattedAge = new Date(age).toISOString().split('T')[0];
  const formattedDateOfEntry = new Date(dateOfEntry).toISOString().split('T')[0];

  const uploadData = new FormData();

  uploadData.append('name', name);
  uploadData.append('age', formattedAge);
  uploadData.append('breed', breed);
  uploadData.append('gender', gender);
  uploadData.append('color', color);
  uploadData.append('description', description);
  uploadData.append('availability', availability);

  for (let i = 0; i < images.length; i++) {
    uploadData.append(`images`, images[i]);
  }

  uploadData.append('dateOfEntry', formattedDateOfEntry);
  uploadData.append('location', selectedLocation);
  uploadData.append('species', user.preferredSpecies);

  console.log('Selected location ID:', selectedLocation);
  

  // Send the token through the request "Authorization" Headers
  axios.post(`${API_URL}/cats`, uploadData,
   { headers: { Authorization: `Bearer ${storedToken}`,   "Content-Type": "multipart/form-data"  },
   withCredentials: true,
  })
  .then((response) => {
    console.log(response);
    // Reset the state
    setName('');
    setAge(new Date());
    setBreed('');
    setGender('');
    setColor('');
    setDescription('');
    setAvailability('');
    setImages([]);
    setDateOfEntry(new Date());
    setSelectedLocation('');
    setSpecies(user.preferredSpecies);
   

    
   navigate('/cats');

  })
  .catch((err) => console.log(err));

};

const handleImages = (e) => {
  const files = e.target.files;
  console.log(files);
  setImages(e.target.files)
}



  return (
    <div className='big-container'>
      <h1 className='big-heading'>Add a pet for adoption</h1>

      <form className='add-cat-form' onSubmit={handleSubmit}>
      <div className='form-box'>
        <label>Pet's name:</label>
        <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
</div>

<div className='form-box'>
        <label>Pet's age:</label>
        <input type='date' name='age' value={age} onChange={(e) => setAge(e.target.value)} />
</div>

<div className='form-box'>
        <label>Pet's breed:</label>
        <input type='text' name='breed' value={breed} onChange={(e) => setBreed(e.target.value)} />
</div>

<div className='form-box'>
        <label>Pet's gender:</label>
       <select id='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value=''>Select gender</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Unknown'>Unknown</option>
       </select>
</div>

<div className='form-box'>
        <label>Pet's color:</label>
        <input type='text' name='color' value={color} onChange={(e) => setColor(e.target.value)} />
</div>

<div className='form-box'>
        <label>Pet's bio:</label>
        <textarea type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
</div>

<div className='form-box'>
        <label>Pet's status:</label>
        <select id='availability' value={availability} onChange={(e) => setAvailability(e.target.value)}>
        <option value=''>Please, select one</option>
        <option value='Available'>Available</option>
        <option value='Adopted'>Adopted</option>
        <option value='Pending'>Pending</option>
        </select>
</div>        


<div className='form-box'>
        <label>In the shelter since</label>
        <input type='date' name='dateOfEntry' value={dateOfEntry} onChange={(e) => setDateOfEntry(e.target.value)} />
</div>

<div className='form-box'>
          <label>Pet's shelter:</label>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value=''>Select a location</option>
            {userLocations.map(location => (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

<input type='file' name='images' onChange={handleImages} multiple className='upload-pet' />

        <button className='btn'>Submit Pet's Information</button>

      </form>
    </div>
  )
}
