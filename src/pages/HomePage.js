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
//     <section className='section-hero'>

//     <div className='home-grid'>

// <div className='home-container-one'>   
// <p className='home-text'>jfjfjkjgkvjckgddgddfkdgjfdlgjfdklgfldgjlfdblfkdmlkfdgjkfldgjlfdgldfgjlfdgjl</p>
// <button className='btn-all btn--singup'>Sign Up</button>
// <h2>Here is some fact about cats!</h2>
// <button className='btn-all btn--get-fact' onClick={getCatFact}>Get a fact</button>
// <p className='api-fact'>{catFact}</p>
// </div>

// <div style={{
//         backgroundImage: 'url(/cats3.png)',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat'
//         }} >

// </div>

// </div>

//     </section>


 <div className='home-container' >



  <div className='hero-img-container' style={{
    backgroundImage: 'url(/paws.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
    }}>
  </div>
</div>  




  )
}


{/* <div className='home-container-two'>
<img src='/cat-homepage.png' alt='Cat illustration' />

</div> */}


{/* <div className='home-container' >

<div className='home-container-one'>   
 <p className='home-text'>jfjfjkjgkvjckgddgddfkdgjfdlgjfdklgfldgjlfdblfkdmlkfdgjkfldgjlfdgldfgjlfdgjl</p>
 <button className='btn-all btn--singup'>Sign Up</button>
<h2>Here is some fact about cats!</h2>
 <button className='btn-all btn--get-fact' onClick={getCatFact}>Get a fact</button>
 <p className='api-fact'>{catFact}</p>
 </div>

  <div className='hero-img-container' style={{
    backgroundImage: 'url(/pawsnew.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
    }}>
  </div>
</div>  */}
