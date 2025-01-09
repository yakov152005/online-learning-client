import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {NAV_DASHBOARD, URL_LOGIN, URL_SERVER_SIDE} from "../utils/Constants.js";
import {TextField, Tooltip} from "@mui/material";
import "../css/SignInAndUp.css"
import Cookies from "universal-cookie";
import { IconLogin2 } from '@tabler/icons-react';


export default function Login(){
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });

        setErrorMessage("");
    }

    const handleSubmit = async () => {
        const { email, password } = formData;
        if (!email || !password ) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_LOGIN, {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.success) {
                cookies.set("token", response.data.verificationLogin.token, { path: "/"});
                const token = cookies.get("token");
                console.log(token);
                navigate(NAV_DASHBOARD);
            } else {
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            setErrorMessage("Error Fetching login user.");
            console.log("Error Fetching login user:", error);
        }
    };

    return (
        <div className="container-sign">
            <div className="form-container-sign">
                <IconLogin2 stroke={1} size={100} style={{marginLeft:"100px",marginTop:"0px"}} />
                <h2 className="form-title-sign">Login</h2>

                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                />

                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button
                    className="btn-sign"
                    onClick={handleSubmit}
                >
                    Sign in
                </button>

                {errorMessage && (
                    <Tooltip title={errorMessage} placement="bottom" arrow open>
                        <div className="error-message-sign">
                            <strong>⛔️Error Message⛔️</strong>
                        </div>
                    </Tooltip>
                )}
            </div>
        </div>
    );
}