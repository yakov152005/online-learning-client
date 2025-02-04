import  {useState} from "react";
import axios from "axios";
import {
    NAV_LOGIN,
    URL_RESET_PASSWORD,
    URL_SERVER_SIDE
}
    from "../../utils/Constants";
import {useNavigate} from "react-router-dom";
import "../../css/home/LoadingStyle.css";
import "../../css/home/ForgetPasswordStyle.css";
import "../../css/home/SignInAndUp.css"
import Swal from "sweetalert2";
import LoadingAnimation from "../../components/animation/LoadingAnimation.jsx";
import {IconLockPassword } from "@tabler/icons-react";
import {TextField, Tooltip} from "@mui/material";
import ForgetPasswordAnimation from "../../components/animation/ForgetPasswordAnimation.jsx";



export default function ForgetPassword() {
    const [username, setUserName] = useState("");
    const [emailForReset, setEmailForReset] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChangeMail = (event) => {
        setEmailForReset(event.target.value);
        setErrorMessage("");
    };

    const handleChangeUser = (event) => {
        setUserName(event.target.value);
        setErrorMessage("");
    };

    const handleClick = async () => {
        if (!emailForReset || !username) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Before you reset your password, make sure you remember your email password and that you are confident in this process.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Reset it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                const response = await axios.get(URL_SERVER_SIDE + URL_RESET_PASSWORD + `/${emailForReset}&${username}`);
                if (response.data.success) {
                    Swal.fire({
                        title: "Success!",
                        html: "A message has been sent to your email, check your email to continue the process... <i class='bi bi-envelope-at'></i>",
                        icon: "success",
                    });

                    setTimeout(() => {
                        setLoading(false);
                        navigate(NAV_LOGIN);
                    }, 50);
                } else {
                    setErrorMessage(response.data.error);
                    Swal.fire("Error", response.data.error, "error");
                    setUserName("");
                    setEmailForReset("");
                    setLoading(false);
                }
            } catch (error) {
                Swal.fire("Error", "Failed to reset password.", "error");
                setErrorMessage("Failed to reset password.");
                console.error("Error get request Email", error);
                setLoading(false);
            }
        }

    };

    return (
        <div className="container-sign">

            {loading && (
                <div className="loading-overlay">
                    <div className="loading-box">
                        <p>Wait a few seconds while the process is processed...
                            <LoadingAnimation/>
                        </p>
                    </div>
                </div>
            )}

            {!loading && (
                <>
                    <div className="left-section">
                        <div className="form-container-sign">
                            <IconLockPassword stroke={1} size={100} style={{marginLeft: "-5px", marginTop: "0px"}}/>
                            <h2 className="form-title-sign">Reset Password</h2>

                            <TextField
                                id="username"
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={handleChangeUser}
                            />

                            <TextField
                                id="emailReset"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={emailForReset}
                                onChange={handleChangeMail}
                            />



                            <button
                                className="btn-sign"
                                onClick={handleClick}>
                                <span>Reset password&nbsp;</span>
                                <i className="bi bi-envelope-at"></i>
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
                                    <a className="custom-link"
                                       onClick={() => navigate(NAV_LOGIN)}
                                       style={{
                                           cursor: "pointer",
                                           textDecoration: "underline",
                                           color: "purple",
                                           display: "inline-flex",
                                           alignItems: "center",
                                           marginLeft: "5px"
                                       }}>
                                        <strong>
                                            Back to login&nbsp;
                                            <i className="bi bi-arrow-right custom-arrow-icon"></i>
                                        </strong>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="right-section">
                        <ForgetPasswordAnimation/>
                        <p className="site-info"
                           style={{color: "black", fontFamily: 'Brush Script MT', fontSize: "25px"}}>
                            If you forgot your password, don't worry, here you can reset it and receive a new password directly to your email.
                        </p>
                    </div>
                </>
            )}
        </div>
    )
};
