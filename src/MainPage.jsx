import { useState, useEffect } from 'react';
import {Box, Container, Grid, IconButton, Typography} from '@mui/material';
import CountryCard from "./components/MainPage/CountryCard.jsx";
import { useNavigate } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

export default function MainPage() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8080/countrys')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleCountryClick = (country) => {

        navigate(`/hotels/${country.id}`);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Welcome to Country & Hotel Finder
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Find countries and their hotels.
                </Typography>
            </Box>

            <Box
                display="flex"
                backgroundColor="#e0e0e0"
                borderRadius="3px"
                sx={{ mb: 6 }}
            >
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Enter Country Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton type="button" sx={{ p: 1 }} >
                    <SearchIcon />
                </IconButton>
            </Box>


            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                Featured Countries
            </Typography>

            <Grid container spacing={4}>
                {filteredCountries.map((country) => (
                    <Grid item xs={12} sm={6} md={4} key={country.id}>
                        <CountryCard country={country} onClick={() => handleCountryClick(country)} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
