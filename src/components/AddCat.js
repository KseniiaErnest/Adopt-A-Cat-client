import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005";

export default function AddCat(props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(new Date());
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [images, setImages] = useState([]);
  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  const [locations, setLocations] = useState([]);
  // Fetching the location from API


// Fetching location from the server
useEffect(() => {
  axios.get(`${API_URL}/locations`)
  .then((response) => {
    setLocations(response.data.allLocations);
  })
  .catch((err) => console.log(err));
}, []);



  return (
    <div>
      <h1>Add a cat for adoption</h1>

      <form onSubmit={handleSubmit}>
        <label>Cat's name:</label>
        <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />

        <label>Cat's age:</label>
        <input type='date' name='age' value={age} onChange={(e) => setAge(e.target.value)} />

        <label>Cat's breed</label>
        <input type='text' name='breed' value={breed} onChange={(e) => setBreed(e.target.value)} />

        <label>Cat's gender:</label>
       <select id='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value=''>Select gender</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Unknown'>Unknown</option>
       </select>

        <label>Cat's color:</label>
        <input type='text' name='color' value={color} onChange={(e) => setColor(e.target.value)} />

        <label>Cat's bio</label>
        <textarea type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Cat's status:</label>
        <select id='availability' value={availability} onChange={(e) => setAvailability(e.target.value)}>
        <option value='Available'>Available</option>
        <option value='Adopted'>Adopted</option>
        <option value='Pending'>Pending</option>
        </select>

        <label>Cat's images:</label>

        <label>Cat's date of entry into the system</label>
        <input type='date' name='dateOfEntry' value={dateOfEntry} onChange={(e) => setDateOfEntry(e.target.value)} />

        <label>Cat is belong to:</label>
        <select value={locations} onChange={(e) => setLocations(e.target.value)}>
          <option value=''>Select a location</option>
          {locations.map((location) => {
            <option key={location._id} value={location._id}> {location.name} </option>
          })}
        </select>

      </form>
    </div>
  )
}
