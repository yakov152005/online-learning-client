import { useState } from "react";
import axios from "axios";
import { NAV_LOGIN, URL_REGISTER, URL_SERVER_SIDE } from "../utils/Constants.js";
import { useNavigate } from "react-router-dom";
import "../css/SignInAndUp.css";
import {TextField, Tooltip} from "@mui/material";
import { IconUserCircle } from '@tabler/icons-react';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
    });

    const [validation, setValidation] = useState({
        username: false,
        password: false,
        passwordConfirm: false,
        email: false,
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });

        setErrorMessage("");

        switch (id) {
            case "username":
                setValidation((prev) => ({
                    ...prev,
                    username: value.length >= 3,
                }));
                break;
            case "password": {
                const hasSpecialChar = /[!@#$%^&*()-+=_]/.test(value);
                const letterUpper = /[A-Z]/.test(value);
                const letterLower = /[a-z]/.test(value);
                const numbers = /[0-9]/.test(value);

                setValidation((prev) => ({
                    ...prev,
                    password:
                        value.length >= 8 && (letterLower || letterUpper) && hasSpecialChar && numbers,
                }));
                break;
            }
            case "passwordConfirm":
                setValidation((prev) => ({
                    ...prev,
                    passwordConfirm: value === formData.password,
                }));
                break;
            case "email": {
                const validDomains = [
                    "@gmail.com",
                    "@gmail.co.il",
                    "@walla.co.il",
                    "@walla.com",
                    "@edu.aac.ac.il",
                ];
                setValidation((prev) => ({
                    ...prev,
                    email: validDomains.some((domain) => value.includes(domain)),
                }));
                break;
            }
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        const { username, password, passwordConfirm, email } = formData;
        if (!username || !password || !passwordConfirm || !email) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_REGISTER, {
                username,
                password,
                passwordConfirm,
                email,
            });
            if (response.data.success) {
                navigate(NAV_LOGIN);
            } else {
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            setErrorMessage("Error Fetching registering user.");
            console.log("Error Fetching registering user:", error);
        }
    };

    const styleError = {
        color: "red", fontSize: "10px"
    }

    const styleSuccess = {
    color: "green", fontSize: "10px"
    }

    return (
        <div className="container-sign">
            <div className="form-container-sign">
                <IconUserCircle stroke={1} size={100} style={{marginLeft:"100px",marginTop:"0px"}} />
                <h2 className="form-title-sign">Register</h2>

                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.username}
                    onChange={handleChange}
                    error={!validation.username && formData.username.length > 0}

                    helperText={
                        formData.username.length > 0 ?
                            !validation.username ?
                                <div style={styleError}>Username must be at least 3 characters ⛔️</div>
                                :<div style={styleSuccess}>Look good ✅ </div>
                        : ""
                    }
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
                    error={!validation.password && formData.password.length > 0}
                    helperText={
                         formData.password.length > 0 ?
                             !validation.password ?
                                 <div style={styleError}>Password must be at least 8 characters with special characters, uppercase, and numbers ⛔️</div>
                                 : <div style={styleSuccess}>Look good ✅ </div>
                             :""
                    }
                />
                <TextField
                    id="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    error={
                        !validation.passwordConfirm &&
                        formData.passwordConfirm.length > 0
                    }
                    helperText={
                        formData.passwordConfirm.length > 0 ?
                            !validation.passwordConfirm ?
                                <div style={styleError}>Passwords do not match ️⛔️</div>
                                : <div style={styleSuccess}>Look good ✅ </div>
                            :""
                    }
                />

                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    error={!validation.email && formData.email.length > 0}
                    helperText={
                        formData.email.length > 0 ?
                            !validation.email ?
                                <div style={styleError}>Invalid email format ⛔️</div>
                                :  <div style={styleSuccess}>Look good ✅ </div>
                            :""
                    }
                />

                <button
                    className="btn-sign"
                    onClick={handleSubmit}
                >
                    Sign Up
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
