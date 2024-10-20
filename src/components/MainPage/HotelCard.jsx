import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HotelCard({ hotel }) {
    const navigate = useNavigate();

    const handleHotelClick = () => {
        navigate(`/hotel/${hotel.id}/rooms`);
    };

    return (
        <Card variant="outlined" onClick={handleHotelClick} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                alt={hotel.name}
                height="140"
                image={hotel.image || 'https://via.placeholder.com/600x200'}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {hotel.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Country: {hotel.country.name}
                </Typography>
            </CardContent>
        </Card>
    );
}
