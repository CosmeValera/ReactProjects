import React from 'react';

/**
 * Challenge: 
 * - Create a Meme component.
 * - Inside the Meme component, render a styled form
 *   with our 2 inputs and the button.
 * - Don't worry about adding any functionality yet
 */
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