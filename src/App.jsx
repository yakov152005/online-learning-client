import './App.css'
import {BrowserRouter} from "react-router-dom";
import ManagerRoutes from "./components/navbar/ManagerRoutes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";



export default function App() {
  return (
     <>
         <BrowserRouter>
             <ManagerRoutes/>
         </BrowserRouter>
     </>
  )
}

