import React from 'react';
import { Card, CardContent, Typography, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    // Calculate the average rating if you want to display it
    const averageRating = room.reviews.length > 0
        ? room.reviews.reduce((acc, review) => acc + review.rating, 0) / room.reviews.length
        : 0;

    return (
        <Link to={`/room/${room.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ mb: 2, cursor: 'pointer', boxShadow: 1 }}>
                <Box sx={{ position: 'relative', height: 200 }}>
                    <img
                        src="https://via.placeholder.com/400x200"
                        alt={`Room ${room.roomNumber}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderTopLeftRadius: '4px',
                            borderTopRightRadius: '4px'
                        }}
                    />
                </Box>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Room #{room.roomNumber} - {room.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Price: {room.pricePerNight} CZK / night
                    </Typography>

                    {/* Display average rating */}
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Rating
                    </Typography>
                    <Rating value={averageRating} readOnly size="small" />
                    {room.reviews.length === 0 && (
                        <Typography variant="body2" color="textSecondary">
                            No reviews yet.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
};

export default RoomCard;
