import React from 'react';

export default function ImageUpload({ images, setImages, maxImages = 5 }) {
  // The component recieves 3 props from AddCatPAge component:
  // imaages: an array, setImages: lets update the images array, whenever the user enters a new URL
  // maxImages: a prop that determines the max numbers of image inputs, by def 5

  const handleImageURL = (index, e) => {
    const newImages = [...images];
    newImages[index] = e.target.value;
    setImages(newImages);
  };

  // The function is called whenever the user changes the value of an image input field.
  // It takes 2 arguments: index (the index/number of the image) and e (event object for the user's input)
  // Function is called ==> creates the copy of the current images using the spread operator ==>
  // updates the value of the image at the specified index with the value entered by the user (e.target.value) ==>
  // calls the setImages fucntion and passes the copy of images === newImages

  return (
    <div>
      {Array.from({ length: maxImages }).map((_, index) => (
        <div key={index}>
          <label htmlFor={`image${index + 1}`}>Image {index + 1} URL:</label>
          <input type='text' id={`image${index + 1}`} value={images[index] || ''} onChange={(e) => handleImageURL(index, e)} />
        </div>
      ))}
    </div>
  )
}

// Array.from method - creates a new array of elements from array-like (strings, sets, maps) or iterable objects (objects with a length: arguments objects, DOM NodeList).
// In ImageUpload I wanted dynamically generate required number of input fields (based on maxImage length) for image URLs.
// The method takes 2 arguments: 1st argument specifies the number of elements (based on maxImages the desired length is created), initially all elements are set to undefined ==>
// 2nd argumet a mapping function to iterate over each element in the array, and for each iteration <div></div> element is returned. 
// 
