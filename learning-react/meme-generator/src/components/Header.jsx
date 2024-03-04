import React from "react";

export function Header() {
    return (
        <header>
            <header className="header">
                <img
                    src="./images/troll-face.png" 
                    className="header--image"
                />
                <h2 className="header--title">Meme Generator</h2>
                <h4 className="header--project">React Course - Project 3</h4>
            </header>
        </header>
    );
}