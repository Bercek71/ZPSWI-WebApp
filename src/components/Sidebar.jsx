import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {
    HomeOutlined as HomeIcon,
    MenuOutlined as MenuIcon,
    LockOutlined as LockIcon,
    PersonAddOutlined as RegisterIcon,
    HotelOutlined as HotelIcon,
    BedOutlined as RoomIcon,
    PublicOutlined as CountriesIcon,
} from "@mui/icons-material";

const SidebarItem = ({ title, to, icon, selected, setSelected }) => (
    <MenuItem
        active={selected === title}
        style={{ color: "black" }}
        onClick={() => setSelected(title)}
        icon={icon}
    >
        <Typography>{title}</Typography>
        <Link to={to} />
    </MenuItem>
);

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    backgroundColor: "#ffffff !important",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuIcon /> : undefined}
                        style={{ margin: "10px 0 20px 0" }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3"></Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                            </Box>

                        </Box>
                    )}

                    <Box pl={isCollapsed ? undefined : "10%"}>
                        <SidebarItem
                            title="Home"
                            to="/"
                            icon={<HomeIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography variant="h6" sx={{ mt: "15px", mb: "5px", pl: "20px" }}>
                            User
                        </Typography>
                        <SidebarItem
                            title="Login"
                            to="/login"
                            icon={<LockIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <SidebarItem
                            title="Register"
                            to="/Register"
                            icon={<RegisterIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography variant="h6" sx={{ mt: "15px", mb: "5px", pl: "20px" }}>
                            Hotel
                        </Typography>
                        <SidebarItem
                            title="Hotels"
                            to="/hotels"
                            icon={<HotelIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <SidebarItem
                            title="Rooms"
                            to="/"
                            icon={<RoomIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <SidebarItem
                            title="Countries"
                            to="/"
                            icon={<CountriesIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
