import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AdminBookingForm = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [priceTotal, setPriceTotal] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://127.0.0.1:8080/users');
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        }
        fetchUsers();

        if (bookingId) {
            async function fetchBooking() {
                try {
                    const response = await fetch(`http://127.0.0.1:8080/bookings/${bookingId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch booking details");
                    }
                    const booking = await response.json();
                    setUserId(booking.appUserId.id);
                    setPriceTotal(booking.priceTotal);
                } catch (error) {
                    console.error("Failed to fetch booking details:", error);
                }
            }
            fetchBooking();
        }
    }, [bookingId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { userId, priceTotal };

        try {
            const url = bookingId
                ? `http://127.0.0.1:8080/bookings/${bookingId}`
                : 'http://127.0.0.1:8080/bookings';
            const method = bookingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save booking");
            }

            navigate('/admin/bookings');
        } catch (error) {
            console.error("Failed to save booking:", error);
            setError("Failed to save booking.");
        }
    };

    return (
        <Container>
            <h2>{bookingId ? 'Upravit rezervaci' : 'Přidat rezervaci'}</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Uživatel</InputLabel>
                    <Select
                        value={userId || ''}
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.email}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Celková cena"
                    value={priceTotal}
                    onChange={(e) => setPriceTotal(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Uložit
                </Button>
            </form>
        </Container>
    );
};

export default AdminBookingForm;
