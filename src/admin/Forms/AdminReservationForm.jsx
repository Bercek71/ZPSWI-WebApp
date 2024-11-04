import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';

const AdminReservationForm = () => {
    const { reservationId } = useParams();
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('CONFIRMED'); // Set default to avoid out-of-range warning
    const [price, setPrice] = useState('');
    const [roomId, setRoomId] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchRoomsAndBookings() {
            try {
                const [roomResponse, bookingResponse] = await Promise.all([
                    fetch('http://127.0.0.1:8080/rooms'),
                    fetch('http://127.0.0.1:8080/bookings')
                ]);

                if (!roomResponse.ok || !bookingResponse.ok) throw new Error("Failed to fetch rooms or bookings");

                setRooms(await roomResponse.json());
                setBookings(await bookingResponse.json());
            } catch (error) {
                console.error("Failed to fetch rooms or bookings:", error);
            }
        }

        async function fetchReservation() {
            if (!reservationId) return;

            try {
                const response = await fetch(`http://127.0.0.1:8080/reservations/${reservationId}`);
                if (!response.ok) throw new Error("Failed to fetch reservation details");

                const reservation = await response.json();
                setStartDate(reservation.startDate || '');
                setEndDate(reservation.endDate || '');
                setStatus(reservation.status || 'CONFIRMED'); // Set a default to avoid undefined value
                setPrice(reservation.price || '');
                setRoomId(reservation.room?.id || '');
                setBookingId(reservation.booking?.id || '');
            } catch (error) {
                console.error("Failed to fetch reservation details:", error);
            }
        }

        async function loadData() {
            await fetchRoomsAndBookings();
            if (reservationId) await fetchReservation();
            setLoading(false);
        }

        loadData();
    }, [reservationId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { startDate, endDate, status, price, roomId, bookingId };

        try {
            const url = reservationId
                ? `http://127.0.0.1:8080/reservations/${reservationId}`
                : 'http://127.0.0.1:8080/reservations';
            const method = reservationId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to save reservation");

            navigate('/admin/reservations');
        } catch (error) {
            console.error("Failed to save reservation:", error);
            setError("Failed to save reservation.");
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <h2>{reservationId ? 'Upravit rezervaci' : 'Přidat rezervaci'}</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                    label="Datum začátku"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    type="date"
                />
                <TextField
                    label="Datum konce"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    type="date"
                />
                <TextField
                    label="Cena"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status || 'CONFIRMED'} // Default to prevent undefined
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                        <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Pokoj</InputLabel>
                    <Select
                        value={roomId || ''}
                        onChange={(e) => setRoomId(e.target.value)}
                    >
                        {rooms.map((room) => (
                            <MenuItem key={room.id} value={room.id}>
                                {`Room ${room.roomNumber} - ${room.type}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Rezervace</InputLabel>
                    <Select
                        value={bookingId || ''}
                        onChange={(e) => setBookingId(e.target.value)}
                    >
                        {bookings.map((booking) => (
                            <MenuItem key={booking.id} value={booking.id}>
                                {`Booking ${booking.id} - ${booking.priceTotal}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Uložit
                </Button>
            </form>
        </Container>
    );
};

export default AdminReservationForm;
