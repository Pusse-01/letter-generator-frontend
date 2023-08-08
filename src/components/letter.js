import React, { useState } from 'react';
import axios from 'axios';
import { getUserDataFromLocalStorage } from '../utils'
import API_BASE_URL from '../config';

const Letter = ({ letter }) => {
    const user = getUserDataFromLocalStorage();
    const [statusMessage, setStatusMessage] = useState('');

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(letter);
        setStatusMessage('Letter copied!');
        setTimeout(() => setStatusMessage(''), 3000);
    };

    const handleSaveLetter = async () => {
        console.log(user)
        try {
            const userId = user._id // Replace with your local storage key
            const response = await fetch(`${API_BASE_URL}/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    letter: letter,
                }),
            });

            if (response.ok) {
                setStatusMessage('Letter saved successfully!');
                setTimeout(() => setStatusMessage(''), 3000);
            } else {
                console.error('Error saving letter:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving letter:', error);
        }
    };

    return (
        <div className="p-4">
            {letter ? (
                <div>
                    {/* Show the generated letter */}
                    <textarea
                        className="border rounded w-full h-64 p-2"
                        readOnly
                        value={letter}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                        <button
                            onClick={handleCopyToClipboard}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Copy to clipboard
                        </button>
                        <button
                            onClick={handleSaveLetter}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save
                        </button>
                    </div>
                    {statusMessage && (
                        <div className="text-sm mt-2 text-green-600">{statusMessage}</div>
                    )}
                </div>
            ) : (
                <div className="text-center text-gray-600">Generate a letter</div>
            )}
        </div>
    );
};

export default Letter;
