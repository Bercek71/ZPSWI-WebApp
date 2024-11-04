// src/router.js
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
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminHotelList from './admin/Lists/AdminHotelList.jsx';
import AdminHotelForm from './admin/Forms/AdminHotelForm.jsx';
import AdminAddressForm from "./admin/Forms/AdminAddressForm.jsx";
import AdminAddressList from "./admin/Lists/AdminAddressList.jsx";
import AdminRoomList from "./admin/Lists/AdminRoomList.jsx";
import AdminRoomForm from "./admin/Forms/AdminRoomForm.jsx";
import AdminUserList from "./admin/Lists/AdminUserList.jsx";
import AdminUserForm from "./admin/Forms/AdminUserForm.jsx";
import AdminBookingForm from "./admin/Forms/AdminBookingForm.jsx";
import AdminBookingList from "./admin/Lists/AdminBookingList.jsx";
import AdminCityList from "./admin/Lists/AdminCityList.jsx";
import AdminCityForm from "./admin/Forms/AdminCityForm.jsx";
import AdminCountryList from "./admin/Lists/AdminCountryList.jsx";
import AdminCountryForm from "./admin/Forms/AdminCountryForm.jsx";
import AdminReservationList from "./admin/Lists/AdminReservationList.jsx";
import AdminReservationForm from "./admin/Forms/AdminReservationForm.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMain />,
        children: [
            { path: "/", element: <MainPage />, loader: mainPageLoader },
            { path: "room/:roomId", element: <RoomDetailPage />, loader: roomDetailLoader },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "hotels/:countryId", element: <HotelListPage />, loader: hotelListLoader },
            { path: "hotels", element: <HotelListPage />, loader: hotelListLoader },
            { path: "hotel/:hotelId/rooms", element: <RoomListPage />, loader: roomListLoader }
        ]
    },
    {
        path: "/admin",
        element: <AdminDashboard />,
        children: [
            { path: "hotels", element: <AdminHotelList /> },
            { path: "add-hotel", element: <AdminHotelForm /> },
            { path: "edit-hotel/:hotelId", element: <AdminHotelForm /> },
            { path: "edit-address/:addressId", element: <AdminAddressForm /> },
            { path: "add-address", element: <AdminAddressForm />},
            { path: "addresses", element: <AdminAddressList /> },
            { path: "rooms", element: <AdminRoomList /> },
            { path: "edit-room/:roomId", element: <AdminRoomForm /> },
            { path: "add-room", element: <AdminRoomForm /> },
            { path: "users", element: <AdminUserList /> },
            { path: "edit-user/:userId", element: <AdminUserForm />},
            { path: "add-user", element: <AdminUserForm />},
            { path: "bookings", element: <AdminBookingList /> },
            { path: "edit-booking/:bookingId", element: <AdminBookingForm /> },
            { path: "add-booking", element: <AdminBookingForm />},
            { path: "cities", element: <AdminCityList /> },
            { path: "edit-city/:cityId", element: <AdminCityForm /> },
            { path: "add-city", element: <AdminCityForm /> },
            { path: "countries", element: <AdminCountryList /> },
            { path: "edit-country/:countryId", element: <AdminCountryForm /> },
            { path: "add-country", element: <AdminCountryForm /> },
            { path: "reservations", element: <AdminReservationList />},
            { path: "edit-reservation/:reservationId", element: <AdminReservationForm />},
            { path: "add-reservation", element: <AdminReservationForm />}
        ]
    }
]);

export default router;
