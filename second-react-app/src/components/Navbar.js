import React from "react";
import reactImg from "images/react-icon-small.png";

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src={reactImg} alt="logo-react" width="35px"/>
                <h2>ReactFacts</h2>
            </div>
            <h3>React Course - Project 1</h3>
        </div>
    );
}

export default Navbar;