import React from 'react';

import { Navbar } from './components/Nabvar';
import { Hero } from './components/Hero';
import { Card } from './components/Card';
import cardsData from './data'

function App() {
    const cards = cardsData.map(item =>
        <Card 
            key = {item.id}
            // item = {item}
            {...item}
        />
    );
    return (
        <div>
            <Navbar />
            <Hero />
            <section className="cards-list">
                {cards}
            </section>
        </div>
    );
}

export default App;