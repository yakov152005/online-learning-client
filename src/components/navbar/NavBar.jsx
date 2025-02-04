import {NavLink} from "react-router-dom";
import {
    NAV_DASHBOARD,
    NAV_EXPLANATION,
    NAV_HOME,
    NAV_LOGIN,
    NAV_REGISTER,
    NAV_SETTINGS
} from "../../utils/Constants.js";
import "../../css/navbar/NavBarStyle.css";
import BookAnimation from "../animation/BookAnimation.jsx";
import {Tooltip} from "@mui/material";
import {IconLogin2, IconUserCircle, IconHome,IconChartBarPopular,IconLogout,IconBook,IconSettings,IconEyeMinus   } from "@tabler/icons-react";


// eslint-disable-next-line react/prop-types
export default function NavBar({isLoggedIn, onLogout, username, isAdmin}) {
    return (
        <nav className="navbar-container">
            <div className="navbar-content">

                <a className="navbar-brand" href={isLoggedIn ? NAV_HOME : NAV_LOGIN}>
                    <BookAnimation/>
                </a>
                <a className="name-nav">
                    Hello {isLoggedIn ? username : "Guest"}
                </a>

                <ul className="navbar-list">
                    {!isLoggedIn && (
                        <>
                            <Tooltip title="Sign Up">
                                <li>
                                    <NavLink
                                        to={NAV_REGISTER}
                                        className={({isActive}) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }>
                                        <strong> Register</strong><br/>&nbsp;
                                        <IconUserCircle stroke={2} size={20}
                                                        style={{
                                                            marginLeft: "22px",
                                                            marginTop: "-4px",
                                                            marginBottom: "2px"
                                                        }}/>
                                    </NavLink>
                                </li>
                            </Tooltip>
                            <Tooltip title="Sign In">
                                <li>
                                    <NavLink
                                        to={NAV_LOGIN}
                                        className={({isActive}) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <strong>Login</strong><br/>
                                        <IconLogin2 stroke={2} size={20}
                                                    style={{
                                                        marginLeft: "12px",
                                                        marginTop: "-4px",
                                                        marginBottom: "2px"
                                                    }}/>
                                    </NavLink>
                                </li>
                            </Tooltip>
                        </>
                    )}

                    {isLoggedIn && (
                        <>
                            {isAdmin &&(
                                <Tooltip title="Admin">
                                    <li>
                                        <NavLink
                                            to={"/admin"}
                                            className={({isActive}) =>
                                                isActive ? "nav-link active" : "nav-link"
                                            }
                                        >
                                            <strong> Admin</strong><br/>&nbsp;
                                            <IconEyeMinus  stroke={2} size={20}
                                                           style={{
                                                               marginLeft: "13px",
                                                               marginTop: "-4px",
                                                               marginBottom: "2px"
                                                           }}/>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                            )}
                            <Tooltip title="Home Page">
                                <li>
                                    <NavLink
                                        to={NAV_HOME}
                                        className={({isActive}) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <strong> Home</strong><br/>&nbsp;
                                        <IconHome stroke={2} size={20}
                                                  style={{marginLeft: "10px", marginTop: "-4px", marginBottom: "2px"}}/>
                                    </NavLink>
                                </li>
                            </Tooltip>
                            <Tooltip title="Statistics">
                                <li>
                                    <NavLink
                                        to={NAV_DASHBOARD}
                                        className={({isActive}) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <strong> Statistics</strong><br/>&nbsp;
                                        <IconChartBarPopular stroke={2} size={20}
                                                             style={{
                                                                 marginLeft: "22px",
                                                                 marginTop: "-4px",
                                                                 marginBottom: "2px"
                                                             }}/>
                                    </NavLink>
                                </li>
                            </Tooltip>
                            <Tooltip title="Explanation">
                                <li>
                                    <NavLink
                                        to={NAV_EXPLANATION}
                                        className={({isActive}) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <strong> Explanation</strong><br/>&nbsp;
                                        <IconBook stroke={2} size={20}
                                                             style={{
                                                                 marginLeft: "32px",
                                                                 marginTop: "-4px",
                                                                 marginBottom: "2px"
                                                             }}/>
                                    </NavLink>
                                </li>
                            </Tooltip>
                            <Tooltip title="Settings">
                                <li>
                                    <NavLink
                                        to={NAV_SETTINGS}
                                        className={({isActive}) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <strong> Settings</strong><br/>&nbsp;
                                        <IconSettings
                                            stroke={2}
                                            size={20}
                                            style={{
                                                marginLeft: "18px",
                                                marginTop: "-4px",
                                                marginBottom: "2px"
                                            }}
                                        />
                                    </NavLink>
                                </li>
                            </Tooltip>
                            <Tooltip title="Logout">
                                <li style={{marginTop: "-5px"}}>
                                    <button className="btn btn-danger" onClick={onLogout}>
                                        <strong>Logout</strong>
                                        <br/>
                                        <IconLogout stroke={2} size={20}
                                                    style={{marginLeft: "12px"}}/>
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
