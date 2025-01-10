import { NavLink } from "react-router-dom";
import { NAV_DASHBOARD, NAV_HOME, NAV_LOGIN, NAV_REGISTER } from "../utils/Constants.js";
import "../css/NavBarStyle.css";
import BookAnimation from "./BookAnimation.jsx";
import {Tooltip} from "@mui/material";
import {IconLogin2, IconUserCircle,IconHome } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
export default function NavBar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar-container">
            <div className="navbar-content">

                <a className="navbar-brand" href={isLoggedIn ? NAV_DASHBOARD : NAV_LOGIN}>
                    <BookAnimation/>
                </a>

                <ul className="navbar-list">
                    {!isLoggedIn && (
                        <>
                        <Tooltip title="Home Page" >
                            <li>
                                <NavLink
                                    to={NAV_HOME}
                                    className={({isActive}) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    <strong> Home</strong><br/>&nbsp;
                                    <IconHome stroke={2} size={20}
                                              style={{marginLeft: "10px", marginTop: "-4px", marginBottom:"2px"}}/>
                                </NavLink>
                            </li>
                        </Tooltip>
                        <Tooltip title="Sign Up" >
                            <li>
                                <NavLink
                                    to={NAV_REGISTER}
                                    className={({isActive}) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }>
                                    <strong> Register</strong><br/>&nbsp;
                                    <IconUserCircle stroke={2} size={20}
                                                    style={{marginLeft: "22px", marginTop: "-4px", marginBottom:"2px"}}/>
                                </NavLink>
                            </li>
                        </Tooltip>
                        <Tooltip title="Sign In" >
                            <li>
                                <NavLink
                                    to={NAV_LOGIN}
                                    className={({isActive}) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    <strong>Login</strong><br/>
                                    <IconLogin2 stroke={2} size={20}
                                                style={{marginLeft: "12px", marginTop: "-4px", marginBottom:"2px"}}/>
                                </NavLink>
                            </li>
                        </Tooltip>
                        </>
                    )}

                    {isLoggedIn && (
                        <>
                        <Tooltip title="Dashboard">
                            <li>
                                <NavLink
                                    to={NAV_DASHBOARD}
                                    className={({isActive}) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        </Tooltip>
                        <Tooltip title="Logout" >
                            <li>
                                <button className="logout-button" onClick={onLogout}>
                                    <span>Logout</span>
                                    <i className="bi bi-box-arrow-right logout-icon"></i>
                                </button>
                            </li>
                        </Tooltip>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
