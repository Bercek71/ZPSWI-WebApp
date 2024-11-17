import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Rating, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HotelCard({ hotel }) {
    const navigate = useNavigate();

    const handleHotelClick = () => {
        navigate(`/hotel/${hotel.id}/rooms`);
    };
    console.log(hotel)

    return (
      <Card
        sx={{
          display: 'flex', // Flex layout for left-right arrangement
          maxWidth: 800,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 3,
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-5px)', // Subtle lift effect
            cursor: 'pointer',
          },
        }}
        onClick={handleHotelClick}
      >
        {/* Left side: Hotel image */}
        <Box sx={{ width: 250, height: 250, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <CardMedia
            component="img"
            image="/SummerHolidays.png"
            alt="Hotel Image"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
          />

        </Box>

        {/* Right side: Hotel details */}
        <CardContent sx={{ flex: 1, paddingLeft: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {hotel.name}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
            {hotel.address?.houseNumber},  {hotel.address?.name}, {hotel.address?.city.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Rating value={4} readOnly precision={0.5} sx={{ marginRight: 1 }} />
            <Typography variant="body2" color="text.secondary">(120 reviews)</Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
            Rooms Available: 34
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
            Price per Night: $120
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            Free Wi-Fi, Pool, 24/7 Concierge
          </Typography>

          {/* Button to view rooms */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none',
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            View Rooms
          </Button>
        </CardContent>
      </Card>
    );
}
