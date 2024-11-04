import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AdminCityForm = () => {
    const { cityId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [countryId, setCountryId] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCountries() {
            try {
                const response = await fetch('http://127.0.0.1:8080/countries');
                if (response.ok) {
                    const data = await response.json();
                    setCountries(data);
                } else {
                    console.error("Failed to fetch countries");
                }
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        }
        fetchCountries();

        if (cityId) {
            async function fetchCity() {
                try {
                    const response = await fetch(`http://127.0.0.1:8080/cities/${cityId}`);
                    if (response.ok) {
                        const city = await response.json();
                        setName(city.name);
                        setZipCode(city.zipCode);
                        setCountryId(city.country.id);
                    } else {
                        console.error("Failed to fetch city details");
                    }
                } catch (error) {
                    console.error("Error fetching city details:", error);
                }
            }
            fetchCity();
        }
    }, [cityId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, zipCode, countryId };

        try {
            const url = cityId
                ? `http://127.0.0.1:8080/cities/${cityId}`
                : 'http://127.0.0.1:8080/cities';
            const method = cityId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                navigate('/admin/cities');
            } else {
                throw new Error("Failed to save city");
            }
        } catch (error) {
            console.error("Error saving city:", error);
            setError("Failed to save city.");
        }
    };

    return (
        <Container>
            <h2>{cityId ? 'Edit City' : 'Add City'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Country</InputLabel>
                    <Select
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value)}
                    >
                        {countries.map(country => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </form>
        </Container>
    );
};

export default AdminCityForm;
