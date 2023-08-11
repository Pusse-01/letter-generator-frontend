import React from 'react'
import Card from '../components/menuCard';

function Home() {
    const cards = [
        {
            title: 'Formal Letter',
            description: 'Generate Formal Letters.',
        },
        // {
        //     title: 'Card 2 Title',
        //     description: 'Description for Card 2.',
        // },
        // {
        //     title: 'Card 3 Title',
        //     description: 'Description for Card 3.',
        // },
        // {
        //     title: 'Card 4 Title',
        //     description: 'Description for Card 4.',
        // },
    ];
    return (
        <div>
            <div className="flex flex-wrap justify-start ml-20">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>

        </div>
    )
}

export default Home

