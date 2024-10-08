import {createBrowserRouter} from "react-router-dom";
import MainPage from "./MainPage.jsx";
import LayoutMain from "./layout/LayoutMain.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMain />,
        children: [{
            path: "/",
            element: <MainPage />,

        }]
    }
])

export default router;