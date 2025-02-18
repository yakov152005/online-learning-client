import "../../css/home/ErrorStyle.css"
import { IconZoomExclamation } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import {NAV_DASHBOARD, NAV_HOME, NAV_LOGIN} from "../../utils/Constants.js";
import Cookies from "universal-cookie";

export default function NotFoundPage() {
    const cookies = new Cookies();
    const token = cookies.get("token",{path: "/"});
    const navigate = useNavigate();

    const handleLogout = () => {
        if (!token) {
            cookies.remove("token", {path: "/"});
            navigate(NAV_LOGIN);
        }else {
            navigate(NAV_HOME);
        }

    };

    return (
        <div className="error-overlay">
            <div className="error-box">
                <div className="spinner-error" style={{ color: "red" }}></div>
                <h1>This page is not Found</h1>
                <h3 style={{color: "red"}}>
                    <strong>
                        ERROR: 404&nbsp;
                        <IconZoomExclamation stroke={1.5} size={35} />
                    </strong>
                </h3>

                <div style={{ margin: "5px", marginLeft: "10px" }}>
                    <a
                        onClick={handleLogout}
                        className="custom-link"
                        style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            color: "gray",
                            display: "inline-flex",
                            alignItems: "center",
                        }}
                    >
                        Back to {token ? "Home Page" : "Login"}&nbsp;
                        <i className="bi bi-arrow-right custom-arrow-icon"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

