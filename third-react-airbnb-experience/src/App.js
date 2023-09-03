import React from 'react';

import { Navbar } from './components/Nabvar';
import { Hero } from './components/Hero';
import { Card } from './components/Card';

function App() {
    return (
            // <Hero />
        <div className='container'>
            <Navbar />
            <Card 
                image = "katie-zaferes.png"
                rate = "5.0"
                position = "6"
                country = "USA"
                description = "Life lessons with Katie Zaferes"
                price = "136"
            />
            <Card 
                image = "marcos.png"
                rate = "5.0"
                position = "30"
                country = "USA"
                description = "Learn wedding photography"
                price = "126"
            />
        </div>
    );
}

export default App;