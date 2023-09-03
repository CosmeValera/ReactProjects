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
                rating = "5.0"
                reviewCount = {6}
                country = "USA"
                title = "Life lessons with Katie Zaferes"
                price = {136}
            />
            <Card 
                image = "marcos.png"
                rating = "5.0"
                reviewCount = {30}
                country = "USA"
                title = "Learn wedding photography"
                price = {126}
            />
        </div>
    );
}

export default App;