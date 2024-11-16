import {Box, Button, Stack, Typography, useTheme} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {Hotel, Public} from "@mui/icons-material";
import React from "react";

export default function Header({showLoginAndRegister = true, showNav = true}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [active, setActive] = React.useState("hotels");
  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: 4,
      paddingX: 4,
      // Add background image to the Box
      backgroundColor: theme.palette.primary.main,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#fff', // Adjust text color for readability
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1,
      },
    }}>
      <Box
        component="nav"
        sx={{display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: 20}}
      >
        <Typography marginTop={2} pad variant="h6" fontWeight="bold" fontFamily="monospace" gutterBottom onClick={() => navigate("/")} >
          Lidl-Hotel.com
        </Typography>
        {showLoginAndRegister &&
          <Box sx={{ml: "auto", marginTop: 2, marginRight: 20}}>
            <Button color={"primary"}
                    component={Link}
                    to={"/register"}
                    sx={{backgroundColor: "white", marginRight: 1}}
                    size={"small"}>
              Register
            </Button>
            <Button
              component={Link}
              to={"/login"}
              color={"primary"} sx={{backgroundColor: "white"}} size={"small"}>
              Login
            </Button>
          </Box>}
      </Box>

      {showNav &&
        <Stack direction={"row"} spacing={2} sx={{marginLeft: 19, marginTop: 1}}>
        <Button onClick={() => setActive("hotel")} variant={active === "hotel" ? "outlined" : "text"}
                startIcon={<Hotel/>} color={"info"} sx={{borderRadius: 5}} component={Link} to={"/hotels"}>
          Hotels
        </Button>
        <Button onClick={() => setActive("destinations")} variant={active === "destinations" ? "outlined" : "text"}
                startIcon={<Public/>} color={"info"} sx={{borderRadius: 5}} component={Link} to={"/hotels"}>
          Destinations
        </Button>

      </Stack>}

    </Box>
  )
}