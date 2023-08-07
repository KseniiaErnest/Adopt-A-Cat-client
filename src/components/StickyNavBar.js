import React, { useEffect } from 'react';
import '../App.css';
import Navbar from './Navbar';

export default function StickyNavBar() {

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar-container');
      const app = document.querySelector('.App');

      if (window.pageYOffset > 0) {
        navbar.classList.add('sticky');
        app.classList.add('scroll');
      } else {
        navbar.classList.remove('sticky');
        app.classList.remove('scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  )
}
