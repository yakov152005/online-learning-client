import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from "../../pages/dashboard/Home.jsx";
import NavBar from "./NavBar.jsx";
import Register from "../../pages/home/Register.jsx";
import Login from "../../pages/home/Login.jsx";
import {NAV_DASHBOARD, NAV_DEFAULT, NAV_ERROR, NAV_HOME, NAV_LOGIN, NAV_REGISTER} from "../../utils/Constants.js";
import ChartsDashboardView from "../dashboard/ChartsDashboardView.jsx";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import ValidateToken from "../../api/ValidateToken.js";
import NotFoundPage from "../../pages/home/NotFoundPage.jsx";
import ScrollToTop from "../../utils/ScrollToTop.js";
import ManagerDashboard from "../../pages/dashboard/ManagerDashboard.jsx";

export default function ManagerRoutes() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    const fetchToken = async ()=> {
        try {
            const api = new ValidateToken();
            await api.validateTokenApi(token,navigate,cookies,setUsername);
        }catch (error){
            console.log("Error to fetching token",error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchToken();
            console.log("home page token check", token);
            console.log("Username passed to manger:", username);
        }
    }, [token, navigate, cookies,username]);


    const handleLogout = () => {
        cookies.remove("token", {path: "/"});
        navigate(NAV_LOGIN);
    };

    return (
        <>
            <NavBar isLoggedIn={!!token} onLogout={handleLogout} username={username}/>
            <ScrollToTop />

            <>
                <Routes>
                    {!token && (
                        <>
                            <Route path={NAV_DEFAULT} element={<Navigate to={NAV_LOGIN}/>}/>
                            <Route path={NAV_REGISTER} element={<Register/>}/>
                            <Route path={NAV_LOGIN} element={<Login onLogin={() => navigate(NAV_HOME)}/>}/>
                            <Route path={NAV_ERROR} element={<NotFoundPage/>}/>

                        </>
                    )}
                    {token  && (
                        <>
                            <Route path={NAV_HOME} element={<Home username={username}/>}/>
                            <Route path={NAV_DASHBOARD} element={<ManagerDashboard username={username} />} />
                            <Route path={NAV_ERROR} element={<NotFoundPage/>}/>
                        </>
                    )}
                </Routes>
            </>
        </>
    )
}