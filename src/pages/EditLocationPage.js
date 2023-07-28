import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

export default function EditLocationPage() {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  // const [cats, setCats] = useState([]);

  const { locationId } = useParams();
  const navigate = useNavigate();

  // Get the token from the localStorage
  const storedToken = localStorage.getItem('authToken');

  // This effect will run after the initial render and each time the catId coming from the URL parameter `catId` changes;
  // Send the token through the request "Authorization" Headers
  useEffect(() => {
    axios.get(`${API_URL}/locations/${locationId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      /* We update the state with the location data coming from the response. This way we set inputs to show the actual data of the location */
      const oneLocation = response.data.oneLocation;

      setName(oneLocation.name);
      setAddress(oneLocation.address);
      setPhoneNumber(oneLocation.phoneNumber);
      setEmail(oneLocation.email);
      setOpeningHours(oneLocation.openingHours);
      setWebsite(oneLocation.website);
      setDescription(oneLocation.description);

    })
    .catch((err) => console.log(err));
  }, []);

  // Send the token through the request "Authorization" Headers
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
const requestBody = { name, address, phoneNumber, email, openingHours, website, description };

// Make a PUT request to update the cat
axios.put(`${API_URL}/locations/${locationId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
.then((response) => {
  navigate(`/locations/${locationId}`)
});
  };

  // Send the token through the request "Authorization" Headers
  const deleteLocationInfo = () => {
    axios.delete(`${API_URL}/locations/${locationId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      navigate('/locations');
    })
    .catch((err) => console.log(err));
  };

  return (
    <div>
       <div className='big-container'>

<h1 className='big-heading'>Add information about organization</h1>

<form className='add-cat-form' onSubmit={handleFormSubmit}>

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



<button className='btn'>Submit Information</button>
</form>

<button onClick={deleteLocationInfo}>Delete Information</button>
</div>
    </div>
  )
}


