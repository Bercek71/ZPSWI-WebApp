import { createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage.jsx";
import LayoutMain from "./layout/LayoutMain.jsx";
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import RoomDetailPage from "./RoomDetailPage.jsx";
import HotelListPage from "./HotelListPage.jsx";
import RoomListPage from "./RoomListPage.jsx";
import { mainPageLoader } from "./loaders/mainPageLoader.jsx";
import { hotelListLoader } from "./loaders/hotelListLoader.jsx";
import { roomListLoader } from "./loaders/roomListLoader.jsx";
import { roomDetailLoader } from "./loaders/roomDetailLoader.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMain />,
        children: [
            {
                path: "/",
                element: <MainPage />,
                loader: mainPageLoader
            },
            {
                path: "room/:roomId",
                element: <RoomDetailPage />,
                loader: roomDetailLoader
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "hotels/:countryId",
                element: <HotelListPage />,
                loader: hotelListLoader
            },
            {
                path: "hotel/:hotelId/rooms",
                element: <RoomListPage />,
                loader: roomListLoader
            }
        ]
    }
]);

export default router;
