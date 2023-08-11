import React, { useState } from 'react';
import { TextField, Button, Grid, Dialog, DialogContent, DialogContentText, CircularProgress } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import API_BASE_URL from '../config';

const Form = ({ setLetter, name, setName }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [formData, setFormData] = useState({
        case_reference: '',
        information_verbatim: '',
        historical_data: '',
        follow_up_date: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        // Convert the date to a string in the format 'YYYY-MM-DD'
        const formattedDate = date ? date.format('YYYY-MM-DD') : null;
        setFormData({ ...formData, follow_up_date: formattedDate });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setName(formData.case_reference)
        setIsLoading(true);
        setDialogOpen(true);
        try {
            const response = await fetch(`${API_BASE_URL}/generate_letter/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Letter generation succeeded
                setLetter(data.generated_letter);
                setDialogMessage('Letter generated successfully');
                setTimeout(() => setDialogMessage(''), 3000);
            } else {
                // Letter generation failed
                setDialogMessage('Letter generation failed !');
                setTimeout(() => setDialogMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error generating letter:', error);
            setDialogMessage('An error occurred while generating the letter');
            setTimeout(() => setDialogMessage(''), 3000);
        } finally {
            setIsLoading(false);
            // Delay closing the dialog to make sure the user sees the final message
            setTimeout(() => {
                setDialogOpen(false);
            }, 2000); // Adjust the delay as needed
        }
    };

    return (
        <div className='p-12'>
            {/* {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-200 opacity-75 flex justify-center items-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            )} */}
            <Dialog open={dialogOpen}>
                <DialogContent>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {isLoading && <CircularProgress />}
                    </div>
                    <DialogContentText>
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: 'left' }}>
                        <Grid container spacing={2} alignItems="flex-start">
                            <Grid item xs={12}>
                                <TextField
                                    label="Surname, Case reference"
                                    name="case_reference"
                                    value={formData.case_reference}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Information Verbatim"
                                    name="information_verbatim"
                                    value={formData.information_verbatim}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Historical data & solution"
                                    name="historical_data"
                                    value={formData.historical_data}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker
                                    label="Date Received"
                                    value={formData.follow_up_date}
                                    onChange={handleDateChange}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Grid>
                        </Grid>
                        <div className="mt-4">
                            <Button type="submit" variant="contained" color="primary">
                                Generate
                            </Button>

                        </div>
                    </div>
                </form>
                {/* Popup Dialog */}
                <Dialog open={dialogOpen}>
                    <DialogContent>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            {isLoading && <CircularProgress />}
                        </div>
                        <DialogContentText>
                            CompFix is in work...
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
};

export default Form;

