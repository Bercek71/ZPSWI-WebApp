import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AdminHotelForm = () => {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [addressId, setAddressId] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await fetch('http://127.0.0.1:8080/addresses');
                if (!response.ok) {
                    throw new Error("Failed to fetch addresses");
                }
                const data = await response.json();
                setAddresses(data);
            } catch (error) {
                console.error("Failed to fetch addresses:", error);
            }
        }
        fetchAddresses();

        if (hotelId) {
            async function fetchHotel() {
                try {
                    const hotelResponse = await fetch(`http://127.0.0.1:8080/hotels/${hotelId}`);
                    if (!hotelResponse.ok) {
                        throw new Error("Failed to fetch hotel details");
                    }
                    const hotel = await hotelResponse.json();
                    setName(hotel.name);
                    setAddressId(hotel.address.id); // Assuming address is fetched with the hotel
                } catch (error) {
                    console.error("Failed to fetch hotel details:", error);
                }
            }
            fetchHotel();
        }
    }, [hotelId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, addressId };

        try {
            const url = hotelId
                ? `http://127.0.0.1:8080/hotels/${hotelId}`
                : 'http://127.0.0.1:8080/hotels';
            const method = hotelId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save hotel");
            }

            navigate('/admin/hotels');
        } catch (error) {
            console.error("Failed to save hotel:", error);
            setError("Failed to save hotel.");
        }
    };

    return (
        <Container>
            <h2>{hotelId ? 'Upravit hotel' : 'Přidat hotel'}</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                    label="Název"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Adresa</InputLabel>
                    <Select
                        value={addressId || ''}
                        onChange={(e) => setAddressId(e.target.value)}
                    >
                        {addresses.map((address) => (
                            <MenuItem key={address.id} value={address.id}>
                                {address.name}, {address.city.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Uložit</Button>
            </form>
        </Container>
    );
};

export default AdminHotelForm;
