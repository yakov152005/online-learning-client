import {useEffect, useState} from "react";
import axios from "axios";
import {URL_GET_DASHBOARD_USER, URL_SERVER_SIDE} from "../../utils/Constants.js";
import Cookies from "universal-cookie";
import {Box, Card, CardContent, CircularProgress, Grid2, Typography} from "@mui/material";
import {Pie, Bar, Radar} from "react-chartjs-2";
import "../../css/dashboard/StatisticsStyle.css"
import {
    Chart as ChartJS,
    RadarController,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import QuestionTable from "../../components/QuestionTable.jsx";

ChartJS.register(
    RadarController,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
);


export default function Dashboard({username}) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [loading, setLoading] = useState(true);
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


    const fetchDashboardDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_DASHBOARD_USER, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    username: username
                }
            });
            if (response.data.success) {
                const result = response.data;
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
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (username) {
            fetchDashboardDetails();
        }
    }, [username]);


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }


    const currentLevelData = {
        labels: currentLevels ? currentLevels.map(({category}) => category) : [],
        datasets: [
            {
                label: "Current Level",
                data: currentLevels ? currentLevels.map(({level}) => level) : [],
                backgroundColor: "rgba(179,64,255,0.45)",
                borderColor: "rgba(255,64,217,0.85)",
                borderWidth: 1,
            },
        ],
    };

    const streakData = {
        labels: streaks ? streaks.map(({category}) => category) : [],
        datasets: [
            {
                label: "Success Streaks",
                data: streaks ? streaks.map(({successStreak}) => successStreak) : [],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: '1',
            },
        ],
    };

    const weakPointsData = {
        labels: weakPoints ? weakPoints.map(({category}) => category) : [],
        datasets: [
            {
                label: "Weak Points",
                data: weakPoints ? weakPoints.map(({errorCount}) => errorCount) : [],
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
            },
        ],
    };

    const totalAnswersData = {
        labels: ["Correct Answers", "Incorrect Answers", "Unanswered Question"],
        datasets: [
            {
                data: [totalCorrectAnswers, totalIncorrectAnswers, totalUnansweredQuestion],
                backgroundColor: ["rgb(142,198,39)", "red", "rgb(145,152,200)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgb(142,198,39)"],
                borderWidth: 0,
            },
        ],
    };

    const correctIncorrectData = {
        labels: Object.keys(correctAnswersPerCategory || {}),
        datasets: [
            {
                label: "Correct Answers",
                data: Object.values(correctAnswersPerCategory || {}),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 3,
            },
            {
                label: "Incorrect Answers",
                data: Object.values(incorrectAnswersPerCategory || {}),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                stacked: true,
            },
            x: {
                stacked: true,
            },
        },
    };

    const radarData = {
        labels: Object.keys(successRate || {}),
        datasets: [
            {
                label: "Success Rate (%)",
                data: Object.values(successRate || {}),
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };



    return (
        <Box sx={{padding: 2}}>
            <Grid2 container spacing={3}>
                <div style={{padding: "10px", columns: "3"}}>

                    <div>
                            <Grid2 item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color={"gray"} gutterBottom>
                                            <strong> Current Levels</strong>
                                        </Typography>
                                        <Bar data={currentLevelData}
                                             width={700} height={300}
                                             options={{responsive: false, scales: {y: {beginAtZero: true, max: 6,},},}}
                                        />
                                        <div style={{color: "gray", fontSize: "10px", marginTop: "10px"}}>
                                            <p>* current level for each subject</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid2>
                    </div>

                    <div style={{marginTop: "30px"}}>
                            <Grid2 item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color={"gray"} gutterBottom>
                                            <strong>Streaks</strong>
                                        </Typography>
                                        <Bar data={streakData}
                                             width={700} height={300}
                                             options={{responsive: false, scales: {y: {beginAtZero: true, max: 10,},},}}
                                        />
                                        <div style={{color: "gray", fontSize: "10px", marginTop: "10px"}}>
                                            <p>* you need 10 streaks for level up!</p>
                                            <p>* If you make one mistake in a particular subject, the sequence resets to 0.</p>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid2>
                    </div>

                    <div style={{marginTop: "30px"}}>
                            <Grid2 item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color={"gray"} gutterBottom>
                                            <strong> Weak Points</strong>
                                        </Typography>
                                        <Bar data={weakPointsData}
                                             width={700} height={300}
                                             options={{
                                                 responsive: false,
                                                 scales: {y: {beginAtZero: true, max: 6,},},
                                             }}
                                        />
                                        <div style={{color: "gray", fontSize: "10px", marginTop: "10px"}}>
                                            <p>* if you make a mistake more than 5 times in the same topic,
                                                the chance of dropping a level for that topic will be 50%.</p>
                                            <p>* after a level drop, the number of errors for that topic is reset.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid2>
                    </div>

                    <div style={{marginTop: "30px"}}>
                        <Grid2 item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" color={"gray"} gutterBottom>
                                        <strong>Correct vs Incorrect Answers</strong>
                                    </Typography>
                                    <Box sx={{height: "300px"}}>
                                        <Bar data={correctIncorrectData} options={barOptions}/>
                                    </Box>
                                    <div style={{color: "gray", fontSize: "10px", marginTop: "10px"}}>
                                        <p>* number of questions answered correctly/incorrectly
                                            By subject name.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </div>

                    <div style={{marginTop: "30px"}}>
                        <Grid2 item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" color={"gray"} gutterBottom>
                                        <strong>Success Rate Per Category</strong>
                                    </Typography>
                                    <div style={{height: "811px"}}>
                                        <Radar data={radarData} options={radarOptions}/>
                                    </div>
                                    <div style={{color: "gray", fontSize: "10px", marginTop: "10px"}}>
                                        <p>* success rates by topic.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </div>


                    <div style={{marginTop: "30px"}}>
                        <Grid2 item xs={12} sm={6} md={4}>
                            <Card>
                            <CardContent>
                                    <Typography variant="h6" color={"gray"} gutterBottom>
                                        <strong>Total</strong>
                                    </Typography>
                                    <Pie data={totalAnswersData} width={700} height={1212}
                                         options={{responsive: false}}/>
                                    <li style={{padding: "10px"}}>
                                        <strong style={{color: "green"}}>Correct answers</strong> {totalCorrectAnswers}
                                        <strong style={{color: "red", marginLeft: "10px"}}> Incorrect
                                            answers</strong> {totalIncorrectAnswers}
                                        <strong style={{color: "turquoise", marginLeft: "10px"}}> Unanswered
                                            Question</strong> {totalUnansweredQuestion}
                                    </li>

                                    <li style={{padding: "10px"}}>
                                        <strong>Success Rate answers:</strong> {totalSuccessRate}
                                    </li>

                                </CardContent>
                            </Card>
                        </Grid2>
                    </div>
                </div>
            </Grid2>

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

        </Box>
    );
}