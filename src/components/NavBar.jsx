import {NavLink} from "react-router-dom";
import {NAV_HOME, NAV_LOGIN, NAV_REGISTER} from "../utils/Constants.js";

export default function NavBar(){
    return(
        <nav>
            <ul>
                <li>
                    <NavLink
                        to={NAV_HOME}
                        style={({isActive}) => ({
                            color: isActive ? 'red' : 'blue'
                        })}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={NAV_REGISTER}
                        style={({isActive}) => ({
                            color: isActive ? 'red' : 'blue'
                        })}>
                        Register
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={NAV_LOGIN}
                        style={({isActive}) => ({
                            color: isActive ? 'red' : 'blue'
                        })}>
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}