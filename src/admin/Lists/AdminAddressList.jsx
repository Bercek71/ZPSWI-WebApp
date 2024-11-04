import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Typography } from '@mui/material';

const AdminAddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await fetch('http://127.0.0.1:8080/addresses');
                if (!response.ok) {
                    throw new Error("Failed to fetch addresses");
                }
                const data = await response.json();

                // Sort addresses by name (case insensitive)
                const sortedAddresses = data.sort((a, b) => a.name.localeCompare(b.name));
                setAddresses(sortedAddresses);
            } catch (error) {
                console.error("Failed to fetch addresses:", error);
            }
        }
        fetchAddresses();
    }, []);

    // Delete address function
    const handleDelete = async (addressId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/addresses/${addressId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete address");
            }

            setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
        } catch (error) {
            console.error("Failed to delete address:", error);
        }
    };

    // Filter addresses based on the input
    const filteredAddresses = addresses.filter(address => {
        return (
            address.name.toLowerCase().includes(filter.toLowerCase()) ||
            address.houseNumber.toString().includes(filter) ||
            address.landRegistryNumber.toString().includes(filter) ||
            address.city.name.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam adres
            </Typography>
            <TextField
                label="Filtrujte podle názvu, čísla domu, čísla v katastru nebo města"
                variant="outlined"
                fullWidth
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                style={{ marginBottom: '20px' }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Název</TableCell>
                        <TableCell>Číslo domu</TableCell>
                        <TableCell>Číslo v katastru</TableCell>
                        <TableCell>Město</TableCell>
                        <TableCell>Akce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredAddresses.map((address) => (
                        <TableRow key={address.id}>
                            <TableCell>{address.name}</TableCell>
                            <TableCell>{address.houseNumber}</TableCell>
                            <TableCell>{address.landRegistryNumber}</TableCell>
                            <TableCell>{address.city.name}</TableCell>
                            <TableCell>
                                <Link to={`/admin/edit-address/${address.id}`}>
                                    <Button variant="contained" color="primary">
                                        Upravit
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(address.id)}
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

export default AdminAddressList;
