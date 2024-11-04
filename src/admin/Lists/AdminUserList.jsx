import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Typography } from '@mui/material';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

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
    }, []);

    // Delete user function
    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            // Update users state after successful delete
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    // Filter users based on the input
    const filteredUsers = users.filter(user => {
        return (
            user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
            user.email.toLowerCase().includes(filter.toLowerCase()) ||
            user.role.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam uživatelů
            </Typography>
            <TextField
                label="Filtrovat podle jména, příjmení, e-mailu nebo role"
                variant="outlined"
                fullWidth
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                style={{ marginBottom: '20px' }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Jméno</TableCell>
                        <TableCell>Příjmení</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Link to={`/admin/edit-user/${user.id}`}>
                                    <Button variant="contained" color="primary">
                                        Upravit
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(user.id)}
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

export default AdminUserList;
