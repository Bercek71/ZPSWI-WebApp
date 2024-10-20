import { useLoaderData } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Divider, Rating } from '@mui/material';
import RoomCard from './components/Rooms/RoomCard.jsx'; // Component to display room details
import { useState } from 'react';
import FilterBar from './components/FilterBar.jsx'; // Reusable Filter component

export default function RoomListPage() {
    const { rooms, hotel } = useLoaderData();
    const [filterTerm, setFilterTerm] = useState('');


    if (!hotel || !rooms) {
        return (
            <Box sx={{ mt: 4, p: 2 }}>
                <Typography variant="h6" color="textSecondary">
                    Loading hotel and room details...
                </Typography>
            </Box>
        );
    }

    const filteredRooms = rooms.filter((room) =>
        room.type.toLowerCase().includes(filterTerm.toLowerCase()) || room.roomNumber.toString().includes(filterTerm)
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, p: 2 }}>


            <Box sx={{ width: '100%', mt: 2 }}>

                <Card sx={{ mb: 4, boxShadow: 2, borderRadius: 2 }}>
                    <CardMedia
                        component="img"
                        alt={hotel.name}
                        height="180"
                        image={hotel.image || 'https://via.placeholder.com/600x180'}
                        sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ position: 'relative' }}>
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                            {hotel.name} {/* Display hotel name */}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            {hotel.city}, {hotel.country.name} ({hotel.country.isoCode})
                        </Typography>


                        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                            <Rating value={hotel.rating} readOnly precision={0.5} size="medium" />
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                            {hotel.description}
                        </Typography>
                    </CardContent>
                </Card>

                <Divider sx={{ mb: 2 }} />

                {/* Rooms List Section */}
                <Typography variant="h5" fontWeight="600" gutterBottom>
                    Available Rooms
                </Typography>
                <Grid container spacing={3}>
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => (
                            <Grid item xs={12} sm={6} md={4} key={room.id}>
                                <RoomCard room={room} />
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                            No rooms available matching the filter.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}
