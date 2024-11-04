import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

const AdminCityList = () => {
    const [cities, setCities] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchCities() {
            try {
                const response = await fetch('http://127.0.0.1:8080/cities');
                if (response.ok) {
                    const data = await response.json();
                    setCities(data);
                } else {
                    console.error("Failed to fetch cities");
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        }
        fetchCities();
    }, []);

    // Delete city function
    const handleDelete = async (cityId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/cities/${cityId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete city");
            }
            // Update cities state after successful delete
            setCities((prevCities) => prevCities.filter((city) => city.id !== cityId));
        } catch (error) {
            console.error("Failed to delete city:", error);
        }
    };

    // Filter cities based on the input
    const filteredCities = cities.filter(city => {
        return (
            city.name.toLowerCase().includes(filter.toLowerCase()) ||
            city.zipCode.toString().includes(filter) ||
            city.country.name.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam měst
            </Typography>
            <TextField
                label="Filtrovat podle názvu, PSČ nebo země"
                variant="outlined"
                fullWidth
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                style={{ marginBottom: '20px' }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Název</TableCell>
                        <TableCell>PSČ</TableCell>
                        <TableCell>Země</TableCell>
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredCities.map((city) => (
                        <TableRow key={city.id}>
                            <TableCell>{city.name}</TableCell>
                            <TableCell>{city.zipCode}</TableCell>
                            <TableCell>{city.country.name}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/admin/edit-city/${city.id}`} variant="contained" color="primary">
                                    Upravit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(city.id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Smazat
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminCityList;
