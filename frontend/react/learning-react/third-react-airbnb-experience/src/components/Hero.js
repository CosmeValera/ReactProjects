import React from 'react';

export function Hero() {
    return(
        <div>
            <div className='stack-of-images-container'>
                <img src="../images/stack_of_images.png" className='stack-of-images' alt=''></img>
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