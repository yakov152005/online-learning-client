import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {
    NAV_FORGET_PASSWORD,
    NAV_HOME,
    NAV_LOGIN,
    NAV_REGISTER,
    URL_LOGIN,
    URL_SERVER_SIDE
} from "../../utils/Constants.js";
import {IconButton, InputAdornment, TextField, Tooltip} from "@mui/material";
import "../../css/home/SignInAndUp.css"
import Cookies from "universal-cookie";
import {IconLogin2} from '@tabler/icons-react';
import LoginAnimation from "../../components/animation/LoginAnimation.jsx";
import LoadingAnimation from "../../components/animation/LoadingAnimation.jsx";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export default function Login() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };


    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});

        setErrorMessage("");
    }

    const handleSubmit = async () => {
        const {email, password} = formData;
        if (!email || !password) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_LOGIN, {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.success) {
                cookies.set("token", response.data.verificationLogin.token, {path: "/"});
                const token = cookies.get("token");
                console.log(token);

                if (!token) {
                    setLoading(false);
                    setErrorMessage("Your session has expired. Please log in again.");
                    console.log("Your session has expired. Please log in again.");
                    navigate(NAV_LOGIN);
                    return;
                }

                setTimeout(() => {
                    console.log("login...")
                    setLoading(false);
                    navigate(NAV_HOME);
                }, 3000);
            } else {
                setErrorMessage(response.data.error);
                setLoading(false);
            }
        } catch (error) {
            setErrorMessage("Error Fetching login user.");
            console.log("Error Fetching login user:", error);
            setLoading(false);
        }
    };

    return (
        <div className="container-sign">

            {loading && (
                <div className="loading-overlay">
                    <div className="loading-box">
                        <p>Login user, please wait...
                            <LoadingAnimation/>
                        </p>
                    </div>
                </div>
            )}

            {!loading && (
                <>
                    <div className="left-section">
                        <div className="form-container-sign">
                            <IconLogin2 stroke={1} size={100} style={{marginLeft: "-5px", marginTop: "0px"}}/>
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
                                type={!showPassword ? "password" : "text"}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword} edge="end">
                                                {
                                                    formData.password.length > 0 && (
                                                        showPassword ? <Visibility/> : <VisibilityOff/>
                                                    )
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <div>
                                <a onClick={() => navigate(NAV_FORGET_PASSWORD)}
                                   className="icon-link"
                                   style={{
                                       cursor: "pointer",
                                       textDecoration: "none",
                                       fontSize:"14px",
                                       color: "blue",
                                       display: "inline-flex",
                                       alignItems: "center",
                                       marginLeft: "220px",
                                   }}>
                                    forgot password?
                                </a>
                            </div>

                            <button
                                className="btn-sign"
                                onClick={handleSubmit}
                            >
                                <span>Sign in</span>
                            </button>

                            {errorMessage && (
                                <Tooltip title={errorMessage} placement="bottom" arrow open>
                                    <div className="error-message-sign">
                                        <strong>⛔️Error Message⛔️</strong>
                                    </div>
                                </Tooltip>
                            )}

                            <div style={{marginTop: "22px"}}>
                                <br/>
                                <div className={"divider-container"}>
                                    <hr className={"divider"}/>
                                    <p className={"or-text"}>or</p>
                                    <hr className={"divider"}/>
                                </div>

                                <div style={{color: "gray", margin: "10px", marginLeft: "10px"}}>
                                    New to Online Learning?
                                    <a className="custom-link"
                                       onClick={() => navigate(NAV_REGISTER)}
                                       style={{
                                           cursor: "pointer",
                                           textDecoration: "underline",
                                           color: "purple",
                                           display: "inline-flex",
                                           alignItems: "center",
                                           marginLeft: "5px"
                                       }}>
                                        <strong> Sign Up!</strong>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="right-section">
                        <LoginAnimation/>
                        <p className="site-info"
                           style={{color: "black", fontFamily: 'Brush Script MT', fontSize: "25px"}}>
                            Welcome back! Log in and solve exercises.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
