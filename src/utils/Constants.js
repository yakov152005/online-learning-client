const URL_SERVER = "http://localhost:8080";
const URL_SERVER_SIDE = URL_SERVER + "/online-learning";
const URL_SSE_USER = URL_SERVER + "/sse/stream/user";
const URL_SEND_MESSAGE = "/send-message";
const URL_SEND_EMAIL = "/send-mail";
const URL_REGISTER = "/add-user";
const URL_LOGIN = "/login-user";
const URL_VALIDATE_TOKEN = "/validateToken";
const URL_GET_QUESTION = "/get-question";
const URL_SUBMIT_ANSWER = "/submit-answer";
const URL_GET_DASHBOARD_USER = "/get-dashboard-user";
const URL_GET_COINS_USER = "/get-user-coins";
const URL_CONFIRM_RESET_PASS = "/confirm-reset-password";
const URL_CHANGE_PASSWORD = "/change-password";
const URL_RESET_PASSWORD = "/reset-password";
const URL_GET_ALL_USERS = "/get-all-users";


const NAV_HOME = "/home";
const NAV_REGISTER = "/register";
const NAV_LOGIN = "/login";
const NAV_DASHBOARD = "/dashboard";
const NAV_EXPLANATION = "/explanation";
const NAV_ERROR = "*";
const NAV_DEFAULT = "/";
const NAV_SETTINGS = "/settings";
const NAV_CHANGE_PASSWORD = "/change-password"
const NAV_FORGET_PASSWORD = "/forgetPassword";
const NAV_CONFIRM_RESET = "/confirm-reset";
const NAV_ACCESSIBILITY = "/accessibility";
const NAV_TERM_AND_PRIVACY = "/terms-and-privacy";


const TIMER_LEVEL_UP = 3000;
const TIMER_LEVEL_DOWN = 3000;
const SECOND = 1000;
const FOR_NEW_QUESTION = 5;

export {
    URL_SERVER_SIDE,
    URL_SSE_USER,
    URL_SEND_MESSAGE,
    URL_SEND_EMAIL,
    URL_REGISTER,
    URL_LOGIN,
    URL_VALIDATE_TOKEN,
    URL_GET_QUESTION,
    URL_SUBMIT_ANSWER,
    URL_GET_DASHBOARD_USER,
    URL_GET_COINS_USER,
    URL_CONFIRM_RESET_PASS,
    URL_CHANGE_PASSWORD,
    URL_RESET_PASSWORD,
    URL_GET_ALL_USERS,
    NAV_HOME,
    NAV_LOGIN,
    NAV_REGISTER,
    NAV_DASHBOARD,
    NAV_ERROR,
    NAV_EXPLANATION,
    NAV_DEFAULT,
    NAV_SETTINGS,
    NAV_CHANGE_PASSWORD,
    NAV_FORGET_PASSWORD,
    NAV_CONFIRM_RESET,
    NAV_TERM_AND_PRIVACY,
    NAV_ACCESSIBILITY,
    TIMER_LEVEL_UP,
    TIMER_LEVEL_DOWN,
    SECOND,
    FOR_NEW_QUESTION,
}