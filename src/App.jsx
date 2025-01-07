import './App.css'
import {BrowserRouter} from "react-router-dom";
import ManagerRoutes from "./components/ManagerRoutes.jsx";

export default function App() {
  return (
     <>
         <BrowserRouter>
             <ManagerRoutes/>
         </BrowserRouter>
     </>
  )
}

