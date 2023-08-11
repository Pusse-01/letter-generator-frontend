import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import Form from '../components/form';
import Letter from '../components/letter';

function Docs() {
    const [letter, setLetter] = useState('');
    const [name, setName] = useState('');

    return (
        <div className="h-screen ml-12">

            <div className='flex'>
                <div className="w-1/2 border-r">
                    <Form setLetter={setLetter} name={name} setName={setName} />
                </div>
                <div className="w-1/2">
                    <Letter letter={letter} name={name} />
                </div>
            </div>

        </div>
    );
}

export default Docs;
