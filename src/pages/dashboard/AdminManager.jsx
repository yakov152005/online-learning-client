import {
    URL_GET_ALL_USERS,
    URL_GET_DASHBOARD_ADMIN,
    URL_SEND_EMAIL,
    URL_SEND_MESSAGE,
    URL_SERVER_SIDE
} from "../../utils/Constants.js";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import TextDashboardView from "../../components/dashboard/TextDashboardView.jsx";
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
import QuestionTable from "../../components/dashboard/QuestionTable.jsx";
import ChartsDashboardView from "../../components/dashboard/ChartsDashboardView.jsx";
import Swal from "sweetalert2";


export default function AdminManager({admin}){
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [viewMode, setViewMode] = useState("charts");
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [error, setError] = useState(null);
    const [streaks, setStreaks] = useState(null);
    const [openQuestions, setOpenQuestion] = useState(null);
    const [questionsAnsweredIncorrectly, setQuestionsAnsweredIncorrectly] = useState(null);
    const [weakPoints, setWeakPoints] = useState(null);
    const [currentLevels, setCurrentLevels] = useState(null);
    const [correctAnswersPerCategory, setCorrectAnswersPerCategory] = useState(null);
    const [incorrectAnswersPerCategory, setIncorrectAnswersPerCategory] = useState(null);
    const [successRate, setSuccessRate] = useState(null);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(null);
    const [totalIncorrectAnswers, setTotalIncorrectAnswers] = useState(null);
    const [totalUnansweredQuestion, setTotalUnansweredQuestion] = useState(null);
    const [totalSuccessRate, setTotalSuccessRate] = useState(null);
    const [showOpenQuestion, setShowOpenQuestion] = useState(false);
    const [showAnsweredIncorrectly, setShowAnsweredIncorrectly] = useState(false);
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
            const response = await axios.post(URL_SEND_MESSAGE, null, {
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
            const response = await axios.post(URL_SEND_EMAIL, null, {
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

    const fetchUserDashboard = async (targetUsername) => {
        if (!targetUsername) return;

        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_DASHBOARD_ADMIN, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { username: admin, targetUsername: targetUsername }
            });
            if (response.data.success) {
                setSelectedUser(targetUsername)
                const result = response.data.dashboardDto;
                setDashboardData(result);
                setStreaks(result.successStreak);
                setOpenQuestion(result.openQuestions);
                setQuestionsAnsweredIncorrectly(result.questionsAnsweredIncorrectly);
                setWeakPoints(result.weakPoints);
                setCurrentLevels(result.currentLevels);
                setCorrectAnswersPerCategory(result.correctAnswersPerCategory);
                setIncorrectAnswersPerCategory(result.incorrectAnswersPerCategory);
                setSuccessRate(result.successRate);
                setTotalCorrectAnswers(result.totalCorrectAnswers);
                setTotalIncorrectAnswers(result.totalIncorrectAnswers);
                setTotalUnansweredQuestion(result.totalUnansweredQuestion);
                setTotalSuccessRate(result.totalSuccessRate);
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            setError("Failed to fetch dashboard details.");
        }
    }


    useEffect(() => {
        if (admin && users.length === 0) {
            fetchUsers();
        }
    }, [admin]);



    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <div style={{padding: "20px", marginBottom: "40px"}}>
            <div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{color: viewMode === "charts" ? "blue" : "gray"}}>
                        <input
                            type="radio"
                            name="viewMode"
                            value="charts"
                            checked={viewMode === "charts"}
                            onChange={() => setViewMode("charts")}
                        />
                        Charts View
                    </label>
                    <label style={{marginLeft: "15px", color: viewMode === "text" ? "blue" : "gray"}}>
                        <input
                            type="radio"
                            name="viewMode"
                            value="text"
                            checked={viewMode === "text"}
                            onChange={() => setViewMode("text")}
                        />
                        Text View
                    </label>
                </div>
                <Container maxWidth="md">
                    <Card sx={{ mt: 4, p: 2 }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                            <Typography variant="h6" gutterBottom>Users List</Typography>
                            <List>
                                {users.map((user) => (
                                    <ListItem key={user.username} disablePadding>
                                        <ListItemButton onClick={() => fetchUserDashboard(user.username)}>
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
                {dashboardData && (
                    <div>
                        <h3>Dashboard of {selectedUser}</h3>
                        {viewMode === "charts" ? (
                            <div>
                                <h3>Charts View</h3>
                                <ChartsDashboardView
                                    streaks={streaks}
                                    weakPoints={weakPoints}
                                    currentLevels={currentLevels}
                                    correctAnswersPerCategory={correctAnswersPerCategory}
                                    incorrectAnswersPerCategory={incorrectAnswersPerCategory}
                                    successRate={successRate}
                                    totalCorrectAnswers={totalCorrectAnswers}
                                    totalIncorrectAnswers={totalIncorrectAnswers}
                                    totalUnansweredQuestion={totalUnansweredQuestion}
                                    totalSuccessRate={totalSuccessRate}
                                />
                            </div>
                        ) : (
                            <div>
                                <h3>Text View</h3>
                                <TextDashboardView
                                    streaks={streaks}
                                    weakPoints={weakPoints}
                                    currentLevels={currentLevels}
                                    correctAnswersPerCategory={correctAnswersPerCategory}
                                    incorrectAnswersPerCategory={incorrectAnswersPerCategory}
                                    successRate={successRate}
                                    totalCorrectAnswers={totalCorrectAnswers}
                                    totalIncorrectAnswers={totalIncorrectAnswers}
                                    totalUnansweredQuestion={totalUnansweredQuestion}
                                    totalSuccessRate={totalSuccessRate}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Box className="box-container" display="flex" gap={2}>
                <Box className="box-section">
                    {!showOpenQuestion ? (
                        <button
                            className={"btn btn-outline-info"}
                            onClick={() => setShowOpenQuestion(true)}
                        >
                            Show Open Questions
                        </button>
                    ) : (
                        <QuestionTable
                            title="Open Questions"
                            questions={openQuestions}
                            onHide={() => setShowOpenQuestion(false)}
                        />
                    )}
                </Box>


                <Box className="box-section">
                    {!showAnsweredIncorrectly ? (
                        <button
                            className={"btn btn-outline-info"}
                            onClick={() => setShowAnsweredIncorrectly(true)}
                        >
                            Show Questions for Practice
                        </button>
                    ) : (
                        <QuestionTable
                            title="Questions for Practice"
                            questions={questionsAnsweredIncorrectly}
                            onHide={() => setShowAnsweredIncorrectly(false)}
                        />
                    )}
                </Box>
            </Box>
        </div>
    );


}