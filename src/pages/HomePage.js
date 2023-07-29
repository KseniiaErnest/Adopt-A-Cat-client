import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [catFact, setCatFact] = useState('');

  const getCatFact = () => {
    axios.get(`https://meowfacts.herokuapp.com/`)
    .then((response) => {
      setCatFact(response.data.data[0])
    })
    .catch((err) => console.log(err));
  };


  return (
    <div className='home-grid'>
      <div className='home-container-one'>
<p>jfjfjkjgkvjckfkdgjfdlgjfdklgfldgjlfdblfkdmlkfdgjkfldgjlfdgldfgjlfdgjl</p>
<button>Sign Up</button>
<h2>Here is some fact about cats!</h2>
<button onClick={getCatFact}>Get a fact</button>
<p>{catFact}</p>

      </div>

      <div className='home-container-two'>
<img src='/Orange White Simple Cat Day Instagram Post (1).png' alt='Cat illustration' />
      </div>
    </div>
  )
}
