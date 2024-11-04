import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Typography } from '@mui/material';

const AdminCountryList = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchCountries() {
            try {
                const response = await fetch('http://127.0.0.1:8080/countries');
                if (!response.ok) {
                    throw new Error("Failed to fetch countries");
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("Failed to fetch countries:", error);
            }
        }
        fetchCountries();
    }, []);

    // Delete country function
    const handleDelete = async (countryId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/countries/${countryId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete country");
            }
            // Update countries state after successful delete
            setCountries((prevCountries) => prevCountries.filter((country) => country.id !== countryId));
        } catch (error) {
            console.error("Failed to delete country:", error);
        }
    };

    // Filter countries based on the input
    const filteredCountries = countries.filter(country => {
        return (
            country.name.toLowerCase().includes(filter.toLowerCase()) ||
            country.isoCode.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam zemí
            </Typography>
            <TextField
                label="Filtrujte podle názvu nebo ISO kódu"
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
                        <TableCell>ISO Kód</TableCell>
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredCountries.map((country) => (
                        <TableRow key={country.id}>
                            <TableCell>{country.name}</TableCell>
                            <TableCell>{country.isoCode}</TableCell>
                            <TableCell>
                                <Link to={`/admin/edit-country/${country.id}`}>
                                    <Button variant="contained" color="primary">
                                        Upravit
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(country.id)}
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

export default AdminCountryList;
