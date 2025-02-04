import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "../../pages/dashboard/Home.jsx";
import NavBar from "./NavBar.jsx";
import Register from "../../pages/home/Register.jsx";
import Login from "../../pages/home/Login.jsx";
import {
    NAV_ACCESSIBILITY,
    NAV_CHANGE_PASSWORD,
    NAV_CONFIRM_RESET,
    NAV_DASHBOARD,
    NAV_DEFAULT,
    NAV_ERROR, NAV_EXPLANATION, NAV_FORGET_PASSWORD,
    NAV_HOME,
    NAV_LOGIN,
    NAV_REGISTER, NAV_SETTINGS, NAV_TERM_AND_PRIVACY,
    SECOND
} from "../../utils/Constants.js";
import "../../css/home/LoadingStyle.css"
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import ValidateToken from "../../api/ValidateToken.js";
import NotFoundPage from "../../pages/home/NotFoundPage.jsx";
import ScrollToTop from "../../utils/ScrollToTop.js";
import ManagerDashboard from "../../pages/dashboard/ManagerDashboard.jsx";
import LoadingLineAnimation from "../animation/LoadingLineAnimation.jsx";
import ExplanationPage from "../../pages/dashboard/ExplanationPage.jsx";
import SettingsPage from "../../pages/settings/SettingsPage.jsx";
import ForgetPassword from "../../pages/home/ForgetPassword.jsx";
import ConfirmResetPasswordPage from "../../pages/home/ConfirmResetPasswordPage.jsx";
import ChangePassword from "../../pages/settings/ChangePassword.jsx";
import Footer from "./Footer.jsx";
import AccessibilityStatement from "../websiteRegulations/AccessibilityStatement.jsx";
import TermsOfUse from "../websiteRegulations/TermsAndPrivacy.jsx";

export default function ManagerRoutes() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);


    const fetchToken = async ()=> {
        try {
            const api = new ValidateToken();
            await api.validateTokenApi(token,navigate,cookies,setUsername);
        }catch (error){
            console.log("Error to fetching token",error);
            cookies.remove("token", { path: "/" });
            navigate(NAV_LOGIN);
        }
    }

    useEffect(() => {
        if (!token  &&
            location.pathname !== NAV_LOGIN && location.pathname !== NAV_REGISTER
            && location.pathname !== NAV_FORGET_PASSWORD  && location.pathname !== NAV_CONFIRM_RESET
            && location.pathname !== NAV_ACCESSIBILITY && location.pathname !== NAV_TERM_AND_PRIVACY
        ) {
            navigate(NAV_LOGIN);
        } else if (token) {
            fetchToken();
        }
    }, [token, navigate, location.pathname]);



    useEffect(() => {
        const protectedRoutes = [NAV_HOME, NAV_DASHBOARD,NAV_EXPLANATION, NAV_ERROR];

        if (protectedRoutes.includes(location.pathname)) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), SECOND * 2);
            return () => clearTimeout(timer);
        }
    }, [location]);

    const handleLogout = () => {
        cookies.remove("token", {path: "/"});
        navigate(NAV_LOGIN);
    };

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <LoadingLineAnimation />
                </div>
            )}

            <NavBar isLoggedIn={!!token} onLogout={handleLogout} username={username}/>
            <ScrollToTop />

            {!loading && (

                    <Routes>

                        <Route path={NAV_ACCESSIBILITY} element={<AccessibilityStatement />} />
                        <Route path={NAV_TERM_AND_PRIVACY} element={<TermsOfUse />} />


                        {!token && (
                            <>
                                <Route path={NAV_DEFAULT} element={<Navigate to={NAV_LOGIN}/>}/>
                                <Route path={NAV_REGISTER} element={<Register/>}/>
                                <Route path={NAV_LOGIN} element={<Login onLogin={() => navigate(NAV_HOME)}/>}/>
                                <Route path={NAV_FORGET_PASSWORD} element={<ForgetPassword/>}/>
                                <Route path={NAV_CONFIRM_RESET} element={<ConfirmResetPasswordPage/>}/>
                                <Route path={NAV_ERROR} element={<NotFoundPage/>}/>

                            </>
                        )}
                        {token  && (
                            <>
                                <Route path={NAV_HOME} element={<Home username={username}/>}/>
                                <Route path={NAV_DASHBOARD} element={<ManagerDashboard username={username} />} />
                                <Route path={NAV_EXPLANATION} element={<ExplanationPage/>}/>
                                <Route path={NAV_SETTINGS} element={<SettingsPage/>} />
                                <Route path={NAV_CHANGE_PASSWORD} element={<ChangePassword/>}/>
                                <Route path={NAV_ERROR} element={<NotFoundPage/>}/>
                            </>
                        )}
                    </Routes>
            )}

            <Footer />
        </>
    )
}