import {
    Container,
    Box,
    Typography,
    Grid,
    Button,
    TextField,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Rating,
    Divider,
    CardMedia
} from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

export default function RoomDetailPage() {
    const roomDetails = useLoaderData();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);


    if (!roomDetails || !roomDetails.hotel) {
        return (
            <Container>
                <Typography variant="h6" color="textSecondary">
                    Loading room details...
                </Typography>
            </Container>
        );
    }

    const handleCommentSubmit = () => {
        if (newComment.trim() && rating > 0) {
            const commentData = {
                text: newComment,
                rating: rating,
                date: new Date().toLocaleDateString(),
            };
            setComments([...comments, commentData]);
            setNewComment('');
            setRating(0);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {roomDetails.hotel.name} - Room #{roomDetails.roomNumber}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                        {roomDetails.hotel.country.name} ({roomDetails.hotel.country.isoCode})
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Room Type:</strong> {roomDetails.type}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Availability:</strong> {roomDetails.isAvailable ? 'Available' : 'Not Available'}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Rating and Comment Section */}
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Leave a Review
                    </Typography>
                    <Rating
                        name="room-rating"
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Your Comment"
                        fullWidth
                        multiline
                        rows={4}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                        Submit
                    </Button>

                    {/* Display Comments */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Reviews
                        </Typography>
                        {comments.length > 0 ? (
                            <List>
                                {comments.map((comment, index) => (
                                    <ListItem key={index} alignItems="flex-start">
                                        <ListItemText
                                            primary={
                                                <Box display="flex" alignItems="center">
                                                    <Rating value={comment.rating} readOnly size="small" sx={{ mr: 1 }} />
                                                    <Typography variant="body2" color="textSecondary">
                                                        {comment.date}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={comment.text}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No reviews yet.
                            </Typography>
                        )}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 2, boxShadow: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <CardMedia
                            component="img"
                            alt="Room image placeholder"
                            height="140"
                            image="https://via.placeholder.com/140"
                            sx={{ mb: 2, objectFit: 'cover', width: '100%' }}
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                                {roomDetails.pricePerNight} CZK / night
                            </Typography>
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    id="check-in"
                                    label="Check-in Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mb: 2 }}
                                    variant="outlined"
                                />
                                <TextField
                                    id="check-out"
                                    label="Check-out Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                            </Box>
                            <Button variant="contained" color="primary" fullWidth>
                                Check Availability
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
