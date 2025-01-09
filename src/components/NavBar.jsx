import { NavLink } from "react-router-dom";
import { NAV_DASHBOARD, NAV_HOME, NAV_LOGIN, NAV_REGISTER } from "../utils/Constants.js";
import "../css/NavBarStyle.css";

// eslint-disable-next-line react/prop-types
export default function NavBar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                <ul className="navbar-list">
                    {!isLoggedIn && (
                        <>
                            <li>
                                <NavLink
                                    to={NAV_HOME}
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={NAV_REGISTER}
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={NAV_LOGIN}
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}

                    {isLoggedIn && (
                        <>
                            <li>
                                <NavLink
                                    to={NAV_DASHBOARD}
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <button className="logout-button" onClick={onLogout}>
                                    <span>Logout</span>
                                    <i className="bi bi-box-arrow-right logout-icon"></i>
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
