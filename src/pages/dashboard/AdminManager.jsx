import {
    URL_GET_ALL_USERS,
    URL_SEND_EMAIL,
    URL_SEND_MESSAGE,
    URL_SERVER_SIDE
} from "../../utils/Constants.js";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {
    Box,
    CardContent,
    TextField,
    Typography,
    Card,
    ListItem,
    ListItemButton,
    ListItemText,
    Container, List, Button
} from "@mui/material";
import Swal from "sweetalert2";
import ManagerDashboard from "./ManagerDashboard.jsx";


export default function AdminManager({ admin }){
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [messageToMail, setMessageToMail] = useState("");


    const handleSendMessage = async () => {
        if (!username || !message) {
            Swal.fire("Error","Please enter both username and message.","error");
            return;
        }

        await sendMessageToUser(username, message);
        setMessage("");
    };

    const sendMessageToUser = async (username, message) => {
        setLoading(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_SEND_MESSAGE, null, {
                params: {
                    username: username,
                    message: message
                }
            });
            if (response.data.success){
                Swal.fire("Done","Message sent successfully!","success");
            }else {
                Swal.fire("Error",response.data.error,"error");
            }
        } catch (error) {
            console.error("Failed to send message:", error);

        }
        setLoading(false);
    };

    const handleMail = async () => {
        if (!email || !messageToMail) {
            Swal.fire("Error","Please enter both email and message.","error");
            return;
        }

        await sendMailToUser(email, messageToMail);
        setMessageToMail("");
    };

    const sendMailToUser = async (email, messageToMail) => {
        setLoading2(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE+ URL_SEND_EMAIL, null, {
                params: {
                    email: email,
                    message: messageToMail
                }
            });

            if (response.data.success){
                Swal.fire("Done","Email sent successfully!","success");
            }else {
                Swal.fire("Error",response.data.error,"error");
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        }
        setLoading2(false);
    };


    const fetchUsers = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_USERS, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { username: admin }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };


    useEffect(() => {
        if (admin && users.length === 0) {
            fetchUsers();
        }
    }, [admin]);



    return (
        <div style={{padding: "20px", marginBottom: "40px"}}>
            <div>
                <Container maxWidth="md">
                    <Card sx={{ mt: 4, p: 2 }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                            <Typography variant="h6" gutterBottom>Users List</Typography>
                            <List>
                                {users.map((user) => (
                                    <ListItem key={user.username} disablePadding>
                                        <ListItemButton onClick={() => setSelectedUser(user.username) } >
                                            <ListItemText primary={user.username} />
                                            <ListItemText primary={user.email} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>

                    <Card sx={{ mt: 4, p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Admin Notification Panel</Typography>
                            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <TextField
                                    label="Enter Username"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Enter Message"
                                    variant="outlined"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSendMessage}
                                    disabled={loading}
                                >
                                    {loading ? "Processing...⌛" : "Send Message ✅"}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ mt: 4, p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Admin Mail Panel</Typography>
                            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <TextField
                                    label="Enter Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Enter Message"
                                    variant="outlined"
                                    value={messageToMail}
                                    onChange={(e) => setMessageToMail(e.target.value)}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleMail}
                                    disabled={loading2}
                                >
                                    {loading2 ? "Processing...⌛" : " Send Email ✅"}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
                    <div>
                        <h3>Dashboard of {selectedUser}</h3>
                        <ManagerDashboard username={selectedUser}/>
                    </div>
            </div>
        </div>
    );


}