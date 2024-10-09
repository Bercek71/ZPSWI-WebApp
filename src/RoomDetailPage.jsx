import { Container, Box, Typography, Grid, Button, TextField, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, ImageList, ImageListItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function RoomDetailPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Room Photos
                </Typography>
                <ImageList cols={3} gap={8} sx={{ mb: 2 }}>
                    {roomImages.map((image, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={image}
                                alt={`Room image ${index + 1}`}
                                loading="lazy"
                                style={{ borderRadius: 8 }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {roomDetails.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                        {roomDetails.location}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {roomDetails.description}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Amenities
                    </Typography>
                    <List>
                        {roomDetails.amenities.map((amenity, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CheckIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary={amenity} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                                {roomDetails.price} CZK / night
                            </Typography>
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    id="check-in"
                                    label="Check-in Date"
                                    type="date"
                                    defaultValue="2023-10-09"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    id="check-out"
                                    label="Check-out Date"
                                    type="date"
                                    defaultValue="2023-10-10"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                            <Button variant="contained" color="primary" fullWidth>
                                Book Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

const roomImages = [
    'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200',
    'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200',
    'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200',
];

const roomDetails = {
    name: 'Luxury Suite',
    location: 'Downtown, New York',
    description:
        'Experience the pinnacle of comfort and luxury in our spacious luxury suite. Featuring stunning city views, a private balcony, and modern amenities, this room is perfect for a relaxing stay. Enjoy free Wi-Fi, a king-sized bed, a minibar, and complimentary breakfast. Perfect for both business travelers and vacationers.',
    price: 2500,
    amenities: [
        'Free Wi-Fi',
        'King-sized bed',
        'Minibar',
        'Flat-screen TV',
        'Room Service',
        'Complimentary breakfast',
        'Private Balcony with City View',
        'Luxury Bathroom',
    ],
};
