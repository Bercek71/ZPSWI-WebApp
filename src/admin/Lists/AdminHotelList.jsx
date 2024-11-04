import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Typography } from '@mui/material';

const AdminHotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchHotels() {
            try {
                const response = await fetch('http://127.0.0.1:8080/hotels');
                if (!response.ok) {
                    throw new Error("Failed to fetch hotels");
                }
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error("Failed to fetch hotels:", error);
            }
        }
        fetchHotels();
    }, []);

    // Delete hotel function
    const handleDelete = async (hotelId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/hotels/${hotelId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete hotel");
            }
            // Update hotels state after successful delete
            setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== hotelId));
        } catch (error) {
            console.error("Failed to delete hotel:", error);
        }
    };

    // Filter hotels based on the input
    const filteredHotels = hotels.filter(hotel => {
        return (
            hotel.name.toLowerCase().includes(filter.toLowerCase()) ||
            hotel.address.name.toLowerCase().includes(filter.toLowerCase()) ||
            hotel.address.city.name.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam hotelů
            </Typography>
            <TextField
                label="Filtrujte podle názvu hotelu, adresy nebo města"
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
                        <TableCell>Adresa</TableCell>
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredHotels.map((hotel) => (
                        <TableRow key={hotel.id}>
                            <TableCell>{hotel.name}</TableCell>
                            <TableCell>{hotel.address.name}, {hotel.address.city.name}</TableCell>
                            <TableCell>
                                <Link to={`/admin/edit-hotel/${hotel.id}`}>
                                    <Button variant="contained" color="primary">Upravit</Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(hotel.id)}
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

export default AdminHotelList;
