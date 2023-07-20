import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:5005";

export default function CatsPage() {
  const [cats, setCats] = useState([]);

  const getAllCats = () => {
    axios.get(`${API_URL}/cats`)
    .then((response) => setCats(response.data.allCats))
    .catch((err) => console.log(err))
  };

  useEffect(() => {
    getAllCats();
  }, []);

  return (
    <div className='cats-page-container'>
      {cats.map((cat) => {
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
        )
      })}
    </div>
  )
}
