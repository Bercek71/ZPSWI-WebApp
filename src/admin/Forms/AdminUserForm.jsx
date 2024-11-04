import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const AdminUserForm = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (userId) {
            async function fetchUser() {
                try {
                    const response = await fetch(`http://127.0.0.1:8080/users/${userId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    const user = await response.json();
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                    setEmail(user.email);
                    setRole(user.role);
                } catch (error) {
                    console.error("Failed to fetch user details:", error);
                }
            }
            fetchUser();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { firstName, lastName, email, password, role };

        try {
            const url = userId ? `http://127.0.0.1:8080/users/${userId}` : 'http://127.0.0.1:8080/users';
            const method = userId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save user");
            }

            navigate('/admin/users');
        } catch (error) {
            console.error("Failed to save user:", error);
            setError("Failed to save user.");
        }
    };

    return (
        <Container>
            <h2>{userId ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth margin="normal" />
                <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth margin="normal" />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </Container>
    );
};

export default AdminUserForm;
