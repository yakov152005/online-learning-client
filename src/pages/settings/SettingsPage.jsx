import "../../css/dashboard/SettingsStyle.css"
import {useNavigate} from "react-router-dom";
import {NAV_CHANGE_PASSWORD} from "../../utils/Constants";
import "../../css/home/ForgetPasswordStyle.css"


export default function SettingsPage() {
    const navigate = useNavigate();

    const handleChangePassword = () => {
        navigate(NAV_CHANGE_PASSWORD);
    };


    return(
        <div className={"setting-home"}>
            <button
                className={"btn btn-outline-danger"}
                onClick={handleChangePassword}
                type={"button"}
            >
                <strong> Change Password</strong>
            </button>
        </div>
    );
}
