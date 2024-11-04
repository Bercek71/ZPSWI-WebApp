import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Typography } from '@mui/material';

const AdminRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await fetch('http://127.0.0.1:8080/rooms');
                if (!response.ok) {
                    throw new Error("Failed to fetch rooms");
                }
                const data = await response.json();

                // Sort rooms by room number (numerically)
                const sortedRooms = data.sort((a, b) => a.roomNumber - b.roomNumber);
                setRooms(sortedRooms);
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
            }
        }
        fetchRooms();
    }, []);

    // Delete room function
    const handleDelete = async (roomId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/rooms/${roomId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete room");
            }
            // Update rooms state after successful delete
            setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
        } catch (error) {
            console.error("Failed to delete room:", error);
        }
    };

    // Filter rooms based on the input
    const filteredRooms = rooms.filter(room => {
        return (
            room.roomNumber.toString().includes(filter) ||
            room.type.toLowerCase().includes(filter.toLowerCase()) ||
            room.pricePerNight.toString().includes(filter) ||
            room.maxGuests.toString().includes(filter) ||
            (room.isAvailable ? 'Ano' : 'Ne').includes(filter) ||
            room.hotel.name.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam pokojů
            </Typography>
            <TextField
                label="Filtrujte podle čísla pokoje, typu, ceny, max. hostů, dostupnosti nebo hotelu"
                variant="outlined"
                fullWidth
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                style={{ marginBottom: '20px' }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Číslo pokoje</TableCell>
                        <TableCell>Typ</TableCell>
                        <TableCell>Cena za noc</TableCell>
                        <TableCell>Max. hostů</TableCell>
                        <TableCell>Dostupnost</TableCell>
                        <TableCell>Hotel</TableCell>
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRooms.map((room) => (
                        <TableRow key={room.id}>
                            <TableCell>{room.roomNumber}</TableCell>
                            <TableCell>{room.type}</TableCell>
                            <TableCell>{room.pricePerNight} Kč</TableCell>
                            <TableCell>{room.maxGuests}</TableCell>
                            <TableCell>{room.isAvailable ? 'Ano' : 'Ne'}</TableCell>
                            <TableCell>{room.hotel.name}</TableCell>
                            <TableCell>
                                <Link to={`/admin/edit-room/${room.id}`}>
                                    <Button variant="contained" color="primary">
                                        Upravit
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(room.id)}
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

export default AdminRoomList;
