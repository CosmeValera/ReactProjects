import React from 'react';
import stackOfImages from '../images/stack_of_images.png';
/*
Challenge: Build the Hero component.
Check the Figma file for the design specifics.
*/
function Hero() {
    return(
        <div>
            <div className='stack-of-images-container'>
                <img src={stackOfImages} className='stack-of-images'></img>
            </div>
            <div className='text-container'>
                <h1>
                    Online Experiences
                </h1>
                <p>
                    Join unique interactive activities led by one-of-a-kind hosts-all withot leaving home
                </p>
            </div>
        </div>
    );
}

export default Hero;