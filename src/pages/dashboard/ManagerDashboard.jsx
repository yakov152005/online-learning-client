import {useEffect, useState} from "react";
import "../../css/ManagerDashboard.css";
import ChartsDashboardView from "../../components/dashboard/ChartsDashboardView.jsx";
import TextDashboardView from "../../components/dashboard/TextDashboardView.jsx";
import Cookies from "universal-cookie";
import axios from "axios";
import {URL_GET_DASHBOARD_USER, URL_SERVER_SIDE} from "../../utils/Constants.js";
import {Box, CircularProgress, Typography} from "@mui/material";
import QuestionTable from "../../components/dashboard/QuestionTable.jsx";

export default function ManagerDashboard({username}) {
    const [viewMode, setViewMode] = useState("charts");
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
                <CircularProgress />
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

    return (
        <div style={{padding: "20px",marginBottom:"40px"}}>
            <div style={{marginBottom: "20px"}}>
                <label>
                    <input
                        type="radio"
                        name="viewMode"
                        value="charts"
                        checked={viewMode === "charts"}
                        onChange={() => setViewMode("charts")}
                    />
                    Charts View
                </label>
                <label style={{marginLeft: "15px"}}>
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