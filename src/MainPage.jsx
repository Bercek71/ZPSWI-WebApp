import { Container, Grid, Card, CardMedia, CardContent, Button, Typography, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const featuredRooms = [
    { id: 1, name: 'Room 1', location: 'S105', price: 1000, image: 'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200' },
    { id: 2, name: 'Room 2', location: 'S106', price: 1000, image: 'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200' },
    { id: 3, name: 'Room 3', location: 'S108', price: 1000, image: 'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200' },
    { id: 4, name: 'Room 4', location: 'S109', price: 1000, image: 'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200' },
    { id: 5, name: 'Room 5', location: 'S110', price: 1000, image: 'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200' },
    { id: 6, name: 'Room 6', location: 'S111', price: 1000, image: 'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200' },
];

export default function MainPage() {
    const navigate = useNavigate();

    const handleBookNow = (roomId) => {
        navigate(`/room/${roomId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Welcome to Hotel Room Booking
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Find the best rooms at the best prices.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <TextField
                    id="location"
                    label="Enter Room or Room Number"
                    variant="outlined"
                    sx={{ mr: 2, width: '300px' }}
                />
                <TextField
                    id="check-in"
                    label="Check-in Date"
                    type="date"
                    defaultValue="2023-10-09"
                    sx={{ mr: 2, width: '200px' }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="check-out"
                    label="Check-out Date"
                    type="date"
                    defaultValue="2023-10-10"
                    sx={{ mr: 2, width: '200px' }}
                    InputLabelProps={{ shrink: true }}
                />
                <Button variant="contained" color="primary" sx={{ height: '56px' }}>
                    Search
                </Button>
            </Box>

            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                Featured Rooms
            </Typography>

            <Grid container spacing={4}>
                {featuredRooms.map((room) => (
                    <Grid item xs={12} sm={6} md={4} key={room.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={room.image}
                                alt={room.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {room.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {room.location}
                                </Typography>
                                <Typography variant="body1" component="p" sx={{ mt: 1, fontWeight: 'bold' }}>
                                    {room.price} CZK / night
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    fullWidth
                                    onClick={() => handleBookNow(room.id)}
                                >
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
