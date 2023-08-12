import React from 'react'
import Card from '../components/menuCard';
import { getUserDataFromLocalStorage } from '../utils'
function Home() {
    const user = getUserDataFromLocalStorage();
    const cards = [
        {
            title: 'Formal Complaints',
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
    console.log(user)
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

