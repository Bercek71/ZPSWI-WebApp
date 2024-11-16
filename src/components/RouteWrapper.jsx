import { RouterProvider } from "react-router-dom";
import router from "../router.jsx";

export default function RouteWrapper() {
    return <RouterProvider router={router} />;
}
