import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AdminRoomForm = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomNumber, setRoomNumber] = useState('');
    const [type, setType] = useState('');
    const [pricePerNight, setPricePerNight] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const [hotelId, setHotelId] = useState('');
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchHotels() {
            try {
                const response = await fetch('http://127.0.0.1:8080/hotels'); // Assuming this endpoint exists
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

        if (roomId) {
            async function fetchRoom() {
                try {
                    const roomResponse = await fetch(`http://127.0.0.1:8080/rooms/${roomId}`);
                    if (!roomResponse.ok) {
                        throw new Error("Failed to fetch room details");
                    }
                    const room = await roomResponse.json();
                    setRoomNumber(room.roomNumber);
                    setType(room.type);
                    setPricePerNight(room.pricePerNight);
                    setMaxGuests(room.maxGuests);
                    setIsAvailable(room.isAvailable);
                    setHotelId(room.hotel.id); // Assuming hotel is fetched with the room
                } catch (error) {
                    console.error("Failed to fetch room details:", error);
                }
            }
            fetchRoom();
        }
    }, [roomId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { roomNumber, type, pricePerNight, maxGuests, isAvailable, hotelId };

        try {
            const url = roomId
                ? `http://127.0.0.1:8080/rooms/${roomId}`
                : 'http://127.0.0.1:8080/rooms';
            const method = roomId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save room");
            }

            navigate('/admin/rooms');
        } catch (error) {
            console.error("Failed to save room:", error);
            setError("Failed to save room.");
        }
    };

    return (
        <Container>
            <h2>{roomId ? 'Upravit pokoj' : 'Přidat pokoj'}</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                    label="Číslo pokoje"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Typ</InputLabel>
                    <Select
                        value={type || ''}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="SINGLE">Jednolůžkový</MenuItem>
                        <MenuItem value="DOUBLE">Dvojlůžkový</MenuItem>
                        <MenuItem value="SUITE">Apartmán</MenuItem>
                        {/* Add more room types as needed */}
                    </Select>
                </FormControl>
                <TextField
                    label="Cena za noc"
                    type="number"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Max. hostů"
                    type="number"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Hotel</InputLabel>
                    <Select
                        value={hotelId || ''}
                        onChange={(e) => setHotelId(e.target.value)}
                    >
                        {hotels.map((hotel) => (
                            <MenuItem key={hotel.id} value={hotel.id}>
                                {hotel.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Dostupnost</InputLabel>
                    <Select
                        value={isAvailable ? 'true' : 'false'}
                        onChange={(e) => setIsAvailable(e.target.value === 'true')}
                    >
                        <MenuItem value="true">Ano</MenuItem>
                        <MenuItem value="false">Ne</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Uložit
                </Button>
            </form>
        </Container>
    );
};

export default AdminRoomForm;
