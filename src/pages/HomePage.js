import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';

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
   
 <div className='home-container' >

  <div className='hero-img-container' style={{
    backgroundImage: 'url(/paws.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
    }}>

    <div className='home-text-box'>
    <h1>Welcome to the Adopt a Cat App! </h1>
    <p className='home-text'>
Why choose cats, you might ask? Well, who can resist the charm of these adorable, fluffy creatures with a knack for occasional mischief? Cats have an uncanny ability to shower us with love and provide endless comfort, and they bring their own unique brand of "cattitude" to our lives.

</p>
<p className='home-text'>At Adopt a Cat, our mission is to bridge the gap between rescue organizations and loving forever homes. We're here to unite future fur moms and dads with their perfect feline companions. Hold onto your catnip, because you're about to embark on a journey that's part heartwarming, part hilarious, and all things whiskers!</p>
<h2>Click on the paw for some facts about cats!</h2>
 <button className=' btn--get-fact' onClick={getCatFact}><img src='/icons8-cat-footprint-50.png' alt='cat paw' /></button>
 <p className='api-fact'>{catFact}</p>
    </div>
  </div>
</div>  


  )
}



