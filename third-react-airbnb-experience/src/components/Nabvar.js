import React from 'react';
import airbnbLogo from "../images/airbnb-logo.png";

export function Navbar() {
    return (
        <nav>
            <img src={airbnbLogo} className='nav--logo'/>
        </nav>
    );
}