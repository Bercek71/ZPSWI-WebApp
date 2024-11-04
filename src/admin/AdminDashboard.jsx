import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Menu, MenuItem, IconButton, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AdminDashboard = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Admin Dashboard
                        </Link>
                    </Typography>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button textAlign="right" color="warning">
                                Back to App
                        </Button>
                    </Link>
                    <IconButton color="inherit" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled><strong>Hotely</strong></MenuItem>
                        <MenuItem component="a" href="/admin/hotels">Seznam hotelů</MenuItem>
                        <MenuItem component="a" href="/admin/add-hotel">Přidat hotel</MenuItem>
                        <Divider />
                        <MenuItem disabled><strong>Adresy</strong></MenuItem>
                        <MenuItem component="a" href="/admin/addresses">Seznam adres</MenuItem>
                        <MenuItem component="a" href="/admin/add-address">Přidat adresu</MenuItem>
                        <Divider />
                        <MenuItem disabled><strong>Uživatelé</strong></MenuItem>
                        <MenuItem component="a" href="/admin/users">Seznam uživatelů</MenuItem>
                        <MenuItem component="a" href="/admin/add-user">Přidat uživatele</MenuItem>
                        <Divider />
                        <MenuItem disabled><strong>Pokoj</strong></MenuItem>
                        <MenuItem component="a" href="/admin/rooms">Seznam pokojů</MenuItem>
                        <MenuItem component="a" href="/admin/add-room">Přidat pokoj</MenuItem>
                        <Divider />
                        <MenuItem disabled><strong>Rezervace</strong></MenuItem>
                        <MenuItem component="a" href="/admin/bookings">Seznam rezervací</MenuItem>
                        <MenuItem component="a" href="/admin/add-booking">Přidat rezervaci</MenuItem>
                        <Divider />
                        <MenuItem disabled><strong>Města</strong></MenuItem>
                        <MenuItem component="a" href="/admin/cities">Seznam měst</MenuItem>
                        <MenuItem component="a" href="/admin/add-city">Přidat město</MenuItem>
                        <Divider />
                        <MenuItem disabled><strong>Státy</strong></MenuItem>
                        <MenuItem component="a" href="/admin/countries">Seznam zemí</MenuItem>
                        <MenuItem component="a" href="/admin/add-country">Přidat zemi</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Container sx={{ marginTop: 2 }}>
                <Outlet />
            </Container>
        </Container>
    );
};

export default AdminDashboard;
