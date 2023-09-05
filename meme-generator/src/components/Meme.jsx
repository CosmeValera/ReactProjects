import React from 'react';
import memesData from "../memesData.jsx"

export function Meme() {
    /**
     * Challenge: Save the random meme URL in state
     * - Create new state called `memeImage` with an
     *   empty string as default
     * - When the getMemeImage function is called, update
     *   the `memeImage` state to be the random chosen
     *   image URL
     * - Below the div.form, add an <img /> and set the
     *   src to the new `memeImage` state you created
     */
    const [memeImage, setMemeImage] = React.useState('');
    

    function getMemeImage() {
        const memesArray = memesData.data.memes;
        const randomNumber = Math.floor(Math.random() * memesArray.length);
        const url = memesArray[randomNumber].url;
        console.log(url);
        setMemeImage(url);
    }

    return (
        <main>
            <div className="form" action="">
                <input className="form--input" type="text" placeholder="top text"/>
                <input className="form--input" type="text" placeholder="bottom text"/>
                <button className="form--button" onClick={getMemeImage}>Get a new meme image</button>
            </div>
            <img className='meme--image' src={memeImage} alt=""/>
        </main>
    )
}