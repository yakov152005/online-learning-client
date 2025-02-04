import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {URL_SSE_USER} from "../../utils/Constants.js";


const NotificationComponent = ({ username }) => {


    useEffect(() => {
        if (username) {
            const userSse = new EventSource(URL_SSE_USER + `/${username}`);

            userSse.addEventListener("newMessage", (event) => {
                const newMessage = event.data;


                toast.info(newMessage, {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            });

            return () => userSse.close();
        }
    }, [username]);

    return (
        <>
            <ToastContainer />
        </>
    );
};

export default NotificationComponent;
