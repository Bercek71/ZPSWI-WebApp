import { useLoaderData } from 'react-router-dom';
import { Box, Grid, TextField, Typography } from '@mui/material';
import HotelCard from './components/MainPage/HotelCard.jsx';
import { useState } from 'react';

export default function HotelListPage() {
    const { hotels, countryId } = useLoaderData();
    const [filterTerm, setFilterTerm] = useState('');

    const filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(filterTerm.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', mt: 4 }}>
            {/* Filter bar on the left */}
            <Box sx={{ width: '20%', mr: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Filter Hotels
                </Typography>
                <TextField
                    id="hotel-filter"
                    label="Enter Hotel Name"
                    variant="outlined"
                    fullWidth
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                />
            </Box>

            {/* Left-aligned Hotel List */}
            <Box sx={{ width: '80%' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Hotels in Country (ID: {countryId})
                </Typography>
                <Grid container spacing={4}>
                    {filteredHotels.map((hotel) => (
                        <Grid item xs={12} sm={6} md={4} key={hotel.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <HotelCard hotel={hotel} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
