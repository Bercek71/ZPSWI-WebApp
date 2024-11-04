import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Typography } from '@mui/material';

const AdminReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchReservations() {
            try {
                const response = await fetch('http://127.0.0.1:8080/reservations');
                if (!response.ok) {
                    throw new Error("Failed to fetch reservations");
                }
                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error("Failed to fetch reservations:", error);
            }
        }
        fetchReservations();
    }, []);

    // Delete reservation function
    const handleDelete = async (reservationId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/reservations/${reservationId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete reservation");
            }
            // Update reservations state after successful delete
            setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== reservationId));
        } catch (error) {
            console.error("Failed to delete reservation:", error);
        }
    };

    // Filter reservations based on the input
    const filteredReservations = reservations.filter(reservation => {
        return (
            reservation.id.toString().includes(filter) ||
            reservation.startDate.includes(filter) ||
            reservation.endDate.includes(filter) ||
            reservation.status.toLowerCase().includes(filter.toLowerCase()) ||
            reservation.price.toString().includes(filter)
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam rezervací
            </Typography>
            <TextField
                label="Filtrujte podle ID, data začátku, data konce, statusu nebo ceny"
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
                        <TableCell>Datum začátku</TableCell>
                        <TableCell>Datum konce</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Cena</TableCell>
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                            <TableCell>{reservation.id}</TableCell>
                            <TableCell>{reservation.startDate}</TableCell>
                            <TableCell>{reservation.endDate}</TableCell>
                            <TableCell>{reservation.status}</TableCell>
                            <TableCell>{reservation.price}</TableCell>
                            <TableCell>
                                <Link to={`/admin/edit-reservation/${reservation.id}`}>
                                    <Button variant="contained" color="primary">
                                        Upravit
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(reservation.id)}
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

export default AdminReservationList;
