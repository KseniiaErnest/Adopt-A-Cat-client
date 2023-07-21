import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    
    <nav className='navbar-container'> 
    <img className='cat-logo-img' src='/catlogo3.png' alt='cat logo' />

    <Link className='navbar-link-box' to='/'>Home</Link>

    <Link className='navbar-link-box' to='/cats'>Cats</Link>

    <Link className='navbar-link-box' to='/cats/add-a-cat'>Add a Cat</Link>

    <Link className='navbar-link-box' to='/locations'>Cats Owners</Link>
    
    </nav>
     
   
  )
}
