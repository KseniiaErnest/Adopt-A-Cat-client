import React, { useState } from 'react';

export default function Carousel( {images} ) {
  // 'currentImageIndex' keeps the track of currently displayed images
  const [currentImageIndex, setImageIndex] = useState(0);

  const handleLeftClick = () => {
    setImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1 ));
    // Checking the edge cases when dispalyed image is very first then display the last one
  };

  const handleRightClick = () => {
    setImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1 ));
    // Checking the edge case when displayed image is very last one, then display the first one
  }

  return (
    <div className='carousel-container'>
    <button className='icon-direction-btn' onClick={handleLeftClick}><img className='icon-direction' src='/icons8-arrow-left-64.png' alt='icon-left' /></button>
      <div className='img-div'>
      <img className='carousel-img' src={images[currentImageIndex]} alt='Photos of the cat' />
      </div>
      <button className='icon-direction-btn' onClick={handleRightClick}><img className='icon-direction' src='/icons8-arrow-right-64.png' alt='icon-right' /></button>
    </div>
  )
}
