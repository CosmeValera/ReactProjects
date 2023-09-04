import React from 'react';

export function Meme() {
    return (
        <main>
            <form className="form" action="">
                <input type="text" placeholder="top text" className="form--input"/>
                <input type="text" placeholder="bottom text" className="form--input"/>
                <input type="button" value="Get a new meme image" className="form--button" />
            </form>
        </main>
    )
}