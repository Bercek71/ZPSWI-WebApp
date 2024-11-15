import { Outlet } from "react-router-dom";
import TopMenu from "./TopMenu.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Box } from '@mui/material';

export default function LayoutMain() {


    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>

            <Box>
                <Sidebar />
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box>
                    <TopMenu />
                </Box>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
