import { Box } from "@mui/material";
const TopMenu = () => {
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box
                display="flex"
                backgroundColor="#e0e0e0"
                borderRadius="3px"
            >
            </Box>


            <Box display="flex">
                {/* <IconButton component={Link} to="/login">
                    <LightModeOutlinedIcon />
                </IconButton>
                <IconButton component={Link} to="/register">
                    <PersonOutlinedIcon />
                </IconButton>
                <IconButton component={Link} to="/">
                    <PersonOutlinedIcon />
                </IconButton>*/}
            </Box>
        </Box>
    );
};
export default TopMenu;


