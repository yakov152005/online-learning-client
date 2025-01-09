import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "../pages/Home.jsx";
import NavBar from "./NavBar.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import {NAV_DASHBOARD, NAV_HOME, NAV_LOGIN, NAV_REGISTER} from "../utils/Constants.js";
import Dashboard from "../pages/Dashboard.jsx";
import Cookies from "universal-cookie";

export default function ManagerRoutes() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const navigate = useNavigate();
    console.log("home page token check", token);

    const handleLogout = () => {
        cookies.remove("token", {path: "/"});
        navigate(NAV_LOGIN);
    };

    return (
        <div>
            <NavBar isLoggedIn={!!token} onLogout={handleLogout}/>

            <div>
                <Routes>
                    {!token && (
                        <>
                            <Route path={NAV_HOME} element={<Home/>}/>
                            <Route path={NAV_REGISTER} element={<Register/>}/>
                            <Route path={NAV_LOGIN} element={<Login onLogin={() => navigate(NAV_DASHBOARD)}/>}/>
                        </>
                    )}
                    {token && (
                        <>
                            <Route path={NAV_DASHBOARD} element={<Dashboard/>}/>
                        </>
                    )}
                </Routes>
            </div>
        </div>
    )
}