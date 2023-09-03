import React from 'react';

import { Navbar } from './components/Nabvar';
import { Hero } from './components/Hero';
import { Card } from './components/Card';
import cardsData from './data'

function App() {
    const cards = cardsData.map(card =>
        <Card 
            image = {card.coverImg}
            rating = {card.stats.rating}
            reviewCount = {card.stats.reviewCount}
            location = {card.location}
            description = {card.description}
            price = {card.price}
        />
    );
    // <Hero />
    return (
        <>
            <Navbar />
            {cards}
        </>
    );
}

export default App;