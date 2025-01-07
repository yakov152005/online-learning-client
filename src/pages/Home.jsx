import {useEffect, useState} from "react";
import axios from "axios";
import {URL_HELLO_FROM_SERVER, URL_SERVER_SIDE} from "../utils/Constants.js";

export default function Home(){
    const [response,setResponse] = useState("");

    const fetchHelloServer = async () => {
        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_HELLO_FROM_SERVER);
            if (response.data.success){
                setResponse(response.data.error);
            }
        }catch (error){
            console.log("Error to fetching data.",error);
        }
    }

    useEffect(() => {
        fetchHelloServer();
    },[])


    return(
        <>
        <h1>Home</h1>
            <h4>{response}</h4>
        </>
    )
}