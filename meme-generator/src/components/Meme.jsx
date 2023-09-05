import React from 'react';
import memesData from "../memesData.jsx"

export function Meme() {

    function getMemeImage() {
        const memesArray = memesData.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        console.log(url)
    }

    return (
        <main>
            <div className="form" action="">
                <input type="text" placeholder="top text" className="form--input"/>
                <input type="text" placeholder="bottom text" className="form--input"/>
                <button onClick={getMemeImage} value="Get a new meme image" className="form--button"></button>
            </div>
        </main>
    )
}