import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Dialog, DialogContent, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';
import { getUserDataFromLocalStorage } from '../utils'
import API_BASE_URL from '../config';
import Letter from './letter';

const LetterCard = () => {
    const user = getUserDataFromLocalStorage();
    const [letters, setLetters] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState(null);

    useEffect(() => {
        // Fetch letters from the API
        const fetchLetters = async () => {
            try {
                const userId = user._id
                const response = await axios.get(`${API_BASE_URL}/get_letters/${userId}`);
                setLetters(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching letters:', error);
            }
        };

        fetchLetters();
    }, []);

    const handleCardClick = (letter) => {
        setSelectedLetter(letter);
    };

    const handleCloseDialog = () => {
        setSelectedLetter(null);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 text-left gap-4 w-4/5 mx-auto mt-12 justify-start">
            <h1>Letters Generated</h1>
            {letters.map((letter) => (
                <Card key={letter.letter_id} className="hover:shadow-md cursor-pointer" onClick={() => handleCardClick(letter)}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom className="font-bold">
                            {letter.name}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom className="text-gray-500">
                            Generated at:  {dayjs(letter.created_at).format('DD MMMM YYYY')}
                        </Typography>
                        {/* You can customize the card content here */}
                    </CardContent>
                </Card>
            ))}
            <Dialog open={selectedLetter !== null} onClose={handleCloseDialog} fullWidth={true}
                maxWidth={'md'}>
                <DialogContent>
                    {selectedLetter && <Letter letter={selectedLetter.generated_letter} name={selectedLetter.name} />}

                    {/* <Typography variant="body1">{selectedLetter?.generated_letter}</Typography> */}
                    {/* <Button onClick={handleCloseDialog}>Close</Button> */}
                </DialogContent>
            </Dialog>
        </div>

    );
};

export default LetterCard;
