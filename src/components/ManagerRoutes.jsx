import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import NavBar from "./NavBar.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import {NAV_HOME, NAV_LOGIN, NAV_REGISTER} from "../utils/Constants.js";

export default function ManagerRoutes(){
    return(
       <div>
           <NavBar/>

           <div>
               <Routes>
                   <Route path={NAV_HOME} element={<Home/>}/>
                   <Route path={NAV_REGISTER} element={<Register/>}/>
                   <Route path={NAV_LOGIN} element={<Login/>}/>
               </Routes>
           </div>
       </div>
    )
}