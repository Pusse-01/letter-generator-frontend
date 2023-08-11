import React from 'react';
import { Card as MUICard, CardContent, Typography } from '@mui/material';
import image from '../assets/menu_icon.png'
import { Link } from 'react-router-dom';

const Card = ({ title, description }) => {
    return (
        <Link to="/generate_letter" className="w-64 mx-2 my-4 cursor-pointer">
            <MUICard className="flex items-center p-4 border border-gray-300 rounded-md shadow-md hover:bg-gray-100">
                <div className="flex-grow pr-4 text-left">
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {description}
                    </Typography>
                </div>
                <div className="flex-shrink-0">
                    <img src={image} alt="Icon" className="w-10 h-10" />
                </div>
            </MUICard>
        </Link>
    );
};

export default Card;
