import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        console.log('Registering with:', { email, password, confirmPassword });
        { /* TODO - handle logging logic (JWT token) */ }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" fullWidth>
                    Register
                </Button>
            </Box>
        </Container>
    );
}
