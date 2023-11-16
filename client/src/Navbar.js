import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='Navbar'>
        <h3>Navbar</h3>
        <ul>
            <Link to='/register' style={{textDecoration:'none'}}>Register</Link>
            <Link to='/Login' style={{textDecoration:'none'}}>Login</Link>
        </ul>
    </div>
  )
}

export default Navbar