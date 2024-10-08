import {Outlet} from "react-router-dom";
import TopMenu from "./TopMenu.jsx";

export default function LayoutMain() {


    return (
        <>
            <TopMenu />
            <Outlet/>
        </>

    )
}