import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Typography } from '@mui/material';

const AdminBookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await fetch('http://127.0.0.1:8080/bookings');
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            }
        }
        fetchBookings();
    }, []);

    // Delete booking function
    const handleDelete = async (bookingId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/bookings/${bookingId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete booking");
            }
            // Update bookings state after successful delete
            setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
        } catch (error) {
            console.error("Failed to delete booking:", error);
        }
    };

    // Filter bookings based on the input
    const filteredBookings = bookings.filter(booking => {
        return (
            booking.appUserId.email.toLowerCase().includes(filter.toLowerCase()) ||
            booking.id.toString().includes(filter)
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam rezervací
            </Typography>
            <TextField
                label="Filtrujte podle ID nebo emailu uživatele"
                variant="outlined"
                fullWidth
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                style={{ marginBottom: '20px' }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Uživatel</TableCell>
                        <TableCell>Celková cena</TableCell>
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>{booking.id}</TableCell>
                            <TableCell>{booking.appUserId.email}</TableCell>
                            <TableCell>{booking.priceTotal}</TableCell>
                            <TableCell>
                                <Link to={`/admin/edit-booking/${booking.id}`}>
                                    <Button variant="contained" color="primary">
                                        Upravit
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(booking.id)}
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

export default AdminBookingList;
