import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';

const AdminCountryForm = () => {
    const { countryId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isoCode, setIsoCode] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (countryId) {
            async function fetchCountry() {
                try {
                    const response = await fetch(`http://127.0.0.1:8080/countries/${countryId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch country details");
                    }
                    const country = await response.json();
                    setName(country.name);
                    setIsoCode(country.isoCode);
                } catch (error) {
                    console.error("Failed to fetch country details:", error);
                }
            }
            fetchCountry();
        }
    }, [countryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, isoCode };

        try {
            const url = countryId
                ? `http://127.0.0.1:8080/countries/${countryId}`
                : 'http://127.0.0.1:8080/countries';
            const method = countryId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save country");
            }

            navigate('/admin/countries');
        } catch (error) {
            console.error("Failed to save country:", error);
            setError("Failed to save country.");
        }
    };

    return (
        <Container>
            <h2>{countryId ? 'Upravit zemi' : 'Přidat zemi'}</h2>
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
                    label="ISO Kód"
                    value={isoCode}
                    onChange={(e) => setIsoCode(e.target.value)}
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

export default AdminCountryForm;
