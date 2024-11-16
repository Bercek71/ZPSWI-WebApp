import { useLoaderData } from 'react-router-dom';
import {
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HotelCard from '../components/MainPage/HotelCard.jsx';
import { useState } from 'react';
import useCityLoader from '../loaders/useCityLoader.jsx';
import useHotelSearch from '../loaders/useHotelSearch.jsx';

export default function HotelListPage() {
    const { hotels, countryId } = useLoaderData();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [cityId, setCityId] = useState('');

    const { cities } = useCityLoader();
    const { filteredHotels, handleSearch } = useHotelSearch({
        hotels, checkIn, checkOut, guests, cityId
    });

    return (
        <Container sx={{ mt: 4}}>
            {/* Form pro hledání */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                        id="check-in"
                        label="Check-in Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{ mr: 2 }}
                        variant="outlined"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                    <TextField
                        id="check-out"
                        label="Check-out Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <TextField
                        id="guests"
                        label="Number of Guests"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        sx={{ mr: 2 }}
                        inputProps={{ min: 1 }}
                    />
                    <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
                        <InputLabel id="city-select-label">City</InputLabel>
                        <Select
                            labelId="city-select-label"
                            id="city-select"
                            value={cityId}
                            onChange={(e) => setCityId(e.target.value)}
                            label="City"
                        >
                            {cities.map((city) => (
                                <MenuItem key={city.id} value={city.id}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    fullWidth
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.05)',
                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                        },
                        borderRadius: '8px',
                        padding: '10px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <SearchIcon sx={{ mr: 1 }} />
                    Search
                </Button>
            </Box>

            <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Hotels in Country (ID: {countryId})
                </Typography>
                <Grid container spacing={4}>
                    {filteredHotels.length === 0 ? (
                        <Typography variant="h6">No hotels found for the given criteria.</Typography>
                    ) : (
                        filteredHotels.map((hotel) => (
                            <Grid item xs={12} sm={6} md={4} key={hotel.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <HotelCard hotel={hotel} />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </Container>
    );
}
