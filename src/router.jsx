import { createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage.jsx";
import LayoutMain from "./layout/LayoutMain.jsx";
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import RoomDetailPage from "./RoomDetailPage.jsx";
import {mainPageLoader} from "./loaders/mainPageLoader.jsx";

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
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
        ]
    }
]);

export default router;
