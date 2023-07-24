import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import ImageUpload from '../components/ImageUpload';

const API_URL = "http://localhost:5005";

export default function EditCatPages() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(new Date());
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [images, setImages] = useState([]);
  const [editedImages, setEditedImages] = useState([]);
  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  

  const { catId } = useParams();
  const navigate = useNavigate(); 

  // Set the editedImages state with the current images when the component mounts
  useEffect(() => {
    setEditedImages(images);
  }, [images]);


   // This effect will run after the initial render and each time the catId coming from the URL parameter `catId` changes
useEffect(() => {
  axios.get(`${API_URL}/cats/${catId}`)
  .then((response) => {
     /* We update the state with the cat data coming from the response. This way we set inputs to show the actual data of the cat */
     const oneCat = response.data.oneCat;

     setName(oneCat.name);
     setAge(oneCat.age);
     setBreed(oneCat.breed);
     setGender(oneCat.gender);
     setColor(oneCat.color);
     setDescription(oneCat.description);
     setAvailability(oneCat.availability);
     setImages(oneCat.images);
     setDateOfEntry(oneCat.dateOfEntry);
  })
  .catch((err) => console.log(err));
}, []);

const handleFormSubmit = (e) => {
  e.preventDefault();
  // Create an object representing the body of the PUT request
  const requestBody = { name, age, breed, gender, color, description, availability, images: editedImages, dateOfEntry };

  // Make a PUT request to update the cat
  axios.put(`${API_URL}/cats/${catId}`, requestBody)
  .then((response) => {
    // Once the request is resolved successfully and the cat is updated we navigate back to the details page
    navigate(`/cats/${catId}`)
  });
};

const deleteCatInfo = () => {
// Make a DELETE request to delete the cat infromation
axios.delete(`${API_URL}/cats/${catId}`)
.then(() => {
  navigate('/cats');
})
.catch((err) => console.log(err));
};

  return (
    <div>
       <div className='big-container'>
      <h1 className='big-heading'>Edit cat's information</h1>

      <form className='add-cat-form' onSubmit={handleFormSubmit}>
      <div className='form-box'>
        <label>Cat's name:</label>
        <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
</div>

<div className='form-box'>
        <label>Cat's age:</label>
        <input type='date' name='age' value={age} onChange={(e) => setAge(e.target.value)} />
</div>

<div className='form-box'>
        <label>Cat's breed</label>
        <input type='text' name='breed' value={breed} onChange={(e) => setBreed(e.target.value)} />
</div>

<div className='form-box'>
        <label>Cat's gender:</label>
       <select id='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value=''>Select gender</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Unknown'>Unknown</option>
       </select>
</div>

<div className='form-box'>
        <label>Cat's color:</label>
        <input type='text' name='color' value={color} onChange={(e) => setColor(e.target.value)} />
</div>

<div className='form-box'>
        <label>Cat's bio</label>
        <textarea type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
</div>

<div className='form-box'>
        <label>Cat's status:</label>
        <select id='availability' value={availability} onChange={(e) => setAvailability(e.target.value)}>
        <option value=''>Please, select one</option>
        <option value='Available'>Available</option>
        <option value='Adopted'>Adopted</option>
        <option value='Pending'>Pending</option>
        </select>
</div>        



<div className='form-box'>
        <label>Cat's date of entry into the system</label>
        <input type='date' name='dateOfEntry' value={dateOfEntry} onChange={(e) => setDateOfEntry(e.target.value)} />
</div>


<ImageUpload images={editedImages} setImages={setEditedImages} maxImages={5} />

        <button className='btn'>Submit Cat's Information</button>

      </form>
      <button onClick={deleteCatInfo}>Delete Information</button>
    </div>
    </div>
  )
}
