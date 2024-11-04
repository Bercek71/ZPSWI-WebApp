import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AdminAddressForm = () => {
    const { addressId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [landRegistryNumber, setLandRegistryNumber] = useState('');
    const [cityId, setCityId] = useState('');
    const [cities, setCities] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCities() {
            try {
                const response = await fetch('http://127.0.0.1:8080/cities');
                if (!response.ok) {
                    throw new Error("Failed to fetch cities");
                }
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        }
        fetchCities();

        if (addressId) {
            async function fetchAddress() {
                try {
                    const addressResponse = await fetch(`http://127.0.0.1:8080/addresses/${addressId}`);
                    if (!addressResponse.ok) {
                        throw new Error("Failed to fetch address details");
                    }
                    const address = await addressResponse.json();
                    setName(address.name);
                    setHouseNumber(address.houseNumber);
                    setLandRegistryNumber(address.landRegistryNumber);
                    setCityId(address.city.id); // Assuming city is fetched with the address
                } catch (error) {
                    console.error("Failed to fetch address details:", error);
                }
            }
            fetchAddress();
        }
    }, [addressId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, houseNumber, landRegistryNumber, cityId };

        try {
            const url = addressId
                ? `http://127.0.0.1:8080/addresses/${addressId}`
                : 'http://127.0.0.1:8080/addresses';
            const method = addressId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save address");
            }

            navigate('/admin/addresses');
        } catch (error) {
            console.error("Failed to save address:", error);
            setError("Failed to save address.");
        }
    };

    return (
        <Container>
            <h2>{addressId ? 'Upravit adresu' : 'Přidat adresu'}</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                    label="Název"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Číslo domu"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Číslo v katastru"
                    value={landRegistryNumber}
                    onChange={(e) => setLandRegistryNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Město</InputLabel>
                    <Select
                        value={cityId || ''}
                        onChange={(e) => setCityId(e.target.value)}
                    >
                        {cities.map((city) => (
                            <MenuItem key={city.id} value={city.id}>
                                {city.name}
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

export default AdminAddressForm;
