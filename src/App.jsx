import './App.css'
import {BrowserRouter} from "react-router-dom";
import ManagerRoutes from "./components/ManagerRoutes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";


export default function App() {
  return (
     <>
         <BrowserRouter>
             <ManagerRoutes/>
         </BrowserRouter>
     </>
  )
}

