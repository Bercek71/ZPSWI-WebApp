import {Outlet, useLocation} from "react-router-dom";
import {Box} from '@mui/material';
import {useEffect, useState} from "react";
import Header from "../components/Header.jsx";

export default function LayoutMain({showLoginAndRegister = true, showNav = true}) {
  const [prevLocation, setPrevLocation] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== prevLocation) {
      setPrevLocation(location.pathname);
      scroll(0, 0);
    }
  }, [location, prevLocation]);

  return (
    <Box>
      <Header showLoginAndRegister={showLoginAndRegister} showNav={showNav}/>
      <Outlet/>
    </Box>
  );
}
