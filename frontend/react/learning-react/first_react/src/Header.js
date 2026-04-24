import React from 'react';

function Header() {
    return (
      <header className="shadow" > 
        <nav className='nav'>
          <img className="nav-logo" src={require('./react-logo.png')} alt='logo-react'/>
          <ul className='nav-items'>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    );
}

export default Header;