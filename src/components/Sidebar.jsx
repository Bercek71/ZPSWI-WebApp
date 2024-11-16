import React, {useState} from "react";
import {Sidebar as ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
//import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlined as HomeIcon,
  MenuOutlined as MenuIcon,
  LockOutlined as LockIcon,
  PersonAddOutlined as RegisterIcon,
  HotelOutlined as HotelIcon,
  BedOutlined as RoomIcon,
  PublicOutlined as CountriesIcon,
} from "@mui/icons-material";

const SidebarItem = ({title, to, icon, selected, setSelected}) => (<MenuItem
  active={selected === title}
  style={{color: "black"}}
  onClick={() => setSelected(title)}
  icon={React.cloneElement(icon, {color: (selected === title) ? "primary" : "inherit"})}
  component={<Link to={to}/>}
>
  <Typography>{title}</Typography>
</MenuItem>);

const Sidebar = ({isCollapsed, setIsCollapsed}) => {
  const theme = useTheme();
  const [selected, setSelected] = useState("Dashboard");
  console.log(theme)
  return (<ProSidebar collapsed={isCollapsed}
                      style={{
                        height: "100vh", display: "flex", flexDirection: "column",
                      }}
                      color={theme.palette.primary.main} backgroundColor={theme.palette.background.default}>
    <Menu iconShape="square" menuItemStyles={{
      button: ({level, active}) => {
        // only apply styles on first level elements of the tree
        if (level === 0) {
          return {
            color: active ? theme.palette.primary.main : theme.palette.text.secondary, // backgroundColor: active ? theme.palette.primary.main : 'transparent',
            '&:hover': {
              color: theme.palette.primary.main, backgroundColor: theme.palette.secondary.light,
            },
          };
        }
      }
    }}>
      <MenuItem
        active={false}
        onClick={() => setIsCollapsed(!isCollapsed)}
        icon={<MenuIcon/>}
        style={{margin: "10px 0 20px 0"}}
      >

      </MenuItem>

      <SidebarItem
        title="Home"
        to={"/"}
        icon={<HomeIcon/>}
        selected={selected}
        setSelected={setSelected}
      />

      <Typography variant="h6" sx={{mt: "15px", mb: "5px", pl: "20px"}}>
        User
      </Typography>
      <SidebarItem
        title="Login"
        to="/login"
        icon={<LockIcon/>}
        selected={selected}
        setSelected={setSelected}
      />
      <SidebarItem
        title="Register"
        to="/Register"
        icon={<RegisterIcon/>}
        selected={selected}
        setSelected={setSelected}
      />

      <Typography variant="h6" sx={{mt: "15px", mb: "5px", pl: "20px"}}>
        Hotel
      </Typography>
      <SidebarItem
        title="Hotels"
        to="/hotels"
        icon={<HotelIcon/>}
        selected={selected}
        setSelected={setSelected}
      />
      <SidebarItem
        title="Rooms"
        to="/"
        icon={<RoomIcon/>}
        selected={selected}
        setSelected={setSelected}
      />
      <SidebarItem
        title="Countries"
        to="/"
        icon={<CountriesIcon/>}
        selected={selected}
        setSelected={setSelected}
      />

    </Menu>
  </ProSidebar>);
};

export default Sidebar;
