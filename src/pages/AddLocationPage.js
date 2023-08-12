import React, { useState } from 'react';
import axios from 'axios';

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function AddLocationPage() {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [cats, setCats] = useState([]);

  // Get the token from the localStorage
  const storedToken = localStorage.getItem('authToken');

 const handleSubmit = (e) => {
  e.preventDefault();

  const requestBody = { name, address, phoneNumber, email, openingHours, website, description, cats };

  // Send the token through the request "Authorization" Headers
  axios.post(`${API_URL}/locations`, requestBody,  { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((response) => {
    // Reset state
    setName('');
    setAddress('');
    setPhoneNumber('');
    setEmail('');
    setOpeningHours('');
    setWebsite('');
    setDescription('');
    setCats('');
  })
  .catch((err) => console.log(err));
 };

  return (
    <div className='big-container'>

      <h1 className='big-heading'>Add information about organization</h1>

      <form className='add-cat-form' onSubmit={handleSubmit}>

      <div  className='form-box'>
        <label>Organization name:</label>
        <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
</div>

<div className='form-box'>
        <label>Address:</label>
        <input type='text' name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
</div>

<div className='form-box'>
        <label>Phone number:</label>
        <input type='text' name='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
</div>

<div className='form-box'>
        <label>Email:</label>
        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
</div>

<div className='form-box'>
        <label>Open Hours:</label>
        <input type='text' name='openingHours' value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} />
</div>

<div className='form-box'>
        <label>Website:</label>
        <input type='text' name='website' value={website} onChange={(e) => setWebsite(e.target.value)} />
</div>

<div className='form-box'>
        <label>About:</label>
        <input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
</div>

<div className='form-box'>
        <label>Cats:</label>
        <input type='text' name='cats' value={cats} onChange={(e) => setCats(e.target.value)} />
</div>


<button className='btn'>Submit Information</button>
      </form>
    </div>
  )
}
