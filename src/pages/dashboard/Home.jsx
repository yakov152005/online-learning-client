import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {
    FOR_NEW_QUESTION,
    SECOND, TIMER_LEVEL_DOWN,
    TIMER_LEVEL_UP, URL_GET_COINS_USER,
    URL_GET_QUESTION,
    URL_SERVER_SIDE,
    URL_SUBMIT_ANSWER
} from "../../utils/Constants.js";
import { ReactSketchCanvas } from "react-sketch-canvas";
import "../../css/dashboard/HomeStyle.css"
import LevelDownAnimation from "../../components/animation/LevelDownAnimation.jsx";
import StreaksLevelsAnimation from "../../components/animation/StreaksLevelsAnimation.jsx";
import {Tabs, Tab, Card, Typography, CardContent} from "@mui/material";
import CategoryInfoCard from "../../components/dashboard/CategoryInfoCard.jsx";
import UserInfoCard from "../../components/dashboard/UserInfoCard.jsx";
import SolutionSteps from "../../components/dashboard/SolutionSteps.jsx";
import Swal from "sweetalert2";
import {Tooltip} from "@mui/material";
import NotificationComponent from "../../components/dashboard/NotificationComponent.jsx";


export default function Home({username}){
    const [category, setCategory] = useState(null);
    const [question, setQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showExplanation,setShowExplanation] = useState(false);
    const [isLevelUp, setIsLevelUp] = useState(null);
    const [isLevelDown, setIsLevelDown] = useState(null);
    const [successStreaksByCategory, setSuccessStreaksByCategory] = useState({});
    const [currentLevelByCategory, setCurrentLevelByCategory] = useState({});
    const [coinsCredits, setCoinsCredits] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const canvasRef = useRef();
    const [timer, setTimer] = useState(null);
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    const countdownInterval = useRef(null);
    const [showCanvas, setShowCanvas] = useState(false);
    const [solution,setSolution] = useState("");
    const [showSolution, setShowSolution] = useState(false);
    const [activeCategoryHb, setActiveCategoryHb] = useState("");
    const [showFullSolution, setShowFullSolution] = useState(false);
    const pendingUpdate = useRef(false);

    useEffect(() => {
        const fetchUserCoins = async () => {
            try {
                const response = await axios.get(URL_SERVER_SIDE + URL_GET_COINS_USER, {
                    params: {username: username}
                });
                if (response.data.success){
                    setCoinsCredits(response.data.coinsCredits);
                }else {
                    console.log(response.data.error);
                }
            } catch (error) {
                console.error("Error fetching user coins:", error);
            }
        };
        fetchUserCoins();
    }, [username]);


    const handleCategorySelection = async (selectedCategory) =>{
        setShowFullSolution(false);
        try {
            setCategory(selectedCategory);
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_QUESTION,{
                params: {username: username, category: selectedCategory}
            });

            setQuestion(response.data.questionDto);

            setSuccessStreaksByCategory(prevState => ({
                ...prevState,
                [selectedCategory]: response.data.successStreak || 0
            }));

            setCurrentLevelByCategory(prevState => ({
                ...prevState,
                [selectedCategory]: response.data.currentLevel || 0
            }));

            setSuccess(null);
            setFeedback(null);

        }catch (error){
            console.error("Error selecting category: ", error);
        }
    }

    const handleNewQuestion = async () => {
        if (!category) {
            alert("Please select a category first!");
            return;
        }

        try {
            setQuestion(null);
            setSolution("");
            setShowFullSolution(false);

            const response = await axios.get(URL_SERVER_SIDE + URL_GET_QUESTION, {
                params: { username: username, category },
            });

            setQuestion(response.data.questionDto);
            setSuccessStreaksByCategory(prevState => ({
                ...prevState,
                [category]: response.data.successStreak || 0
            }));

            setCurrentLevelByCategory(prevState => ({
                ...prevState,
                [category]: response.data.currentLevel || 0
            }));

            setFeedback(null);
            setSuccess(null);
            setShowExplanation(false);
        } catch (error) {
            console.error("Error fetching new question:", error);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!question) {
            alert("No question to answer!");
            return;
        }
        try {
            console.log("Submitting answer with questionId:", question.id, "userAnswer:", userAnswer, "username:", username);

            const response = await axios.post(URL_SERVER_SIDE + URL_SUBMIT_ANSWER, null, {
                params: {
                    questionId: question.id,
                    userAnswer: String(userAnswer).trim(),
                    username: username,
                },
            });
            console.log("Server response:", response.data);

            setSuccess(response.data.success);
            setFeedback(response.data.error);
            setIsLevelUp(response.data.levelUp);
            setIsLevelDown(response.data.levelDown);
            setSuccessStreaksByCategory(response.data.successStreaksByCategory);
            setCoinsCredits(response.data.coins);
            setCurrentLevelByCategory(response.data.currentLevelByCategory);

            if (!response.data.success) {
                setShowSolution(true);
                setSolution(response.data.solution);
            } else {
                setShowSolution(false);
                setSolution("");
            }

            if (response.data.levelUp){
                setIsLevelUp(true);
                setTimeout(() => {
                    setIsLevelUp(false);
                }, TIMER_LEVEL_UP);
            }

            if (response.data.levelDown){
                setIsLevelDown(true);
                setTimeout(() => {
                    setIsLevelDown(false);
                }, TIMER_LEVEL_DOWN);
            }

            setUserAnswer("");
            setQuestion("");
            startCountdown();
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

    const startCountdown = () => {
        let countdown = FOR_NEW_QUESTION;
        setTimer(countdown);
        setIsCountdownActive(true);

        countdownInterval.current = setInterval(() => {
            countdown -= 1;
            setTimer(countdown);
            if (countdown <= 0) {
                clearInterval(countdownInterval.current);
                handleNewQuestion();
                setIsCountdownActive(false);
            }
        }, SECOND);
    };

    const stopCountdown = () => {
        if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
            setIsCountdownActive(false);
            setTimer(null);
            setCategory(null);
            setFeedback(null);
            setShowFullSolution(false);
        }
    };


    const handleActiveCategory = (category) => {
        switch (category) {
            case "addition":
                return "חיבור";
            case "subtraction":
                return "חיסור";
            case "multiplication":
                return "כפל";
            case "division":
                return "חילוק";
            case "wordProblem":
                return "בעיות מילוליות";
            case "invoiceSeries":
                return "סדרה חשבונית";
            case "quadraticEquation":
                return "משוואה ריבועית";
            case "equationOfTheLine":
                return "משוואת קו הישר";
            case "derivative":
                return "נגזרות";
            default:
                return "";
        }
    };

    useEffect(() => {
        setActiveCategoryHb(handleActiveCategory(category));
    }, [category]);


    const subtopics = {
        invoice: [
            { name: "חיבור", icon: "➕", value: "addition" },
            { name: "חיסור", icon: "➖", value: "subtraction" },
            { name: "כפל", icon: "✖️", value: "multiplication" },
            { name: "חילוק", icon: "➗", value: "division" }
        ],
        math: [
            { name: "סדרה חשבונית", icon: "🔢", value: "invoiceSeries" },
            { name: "משוואה ריבועית", icon: "📐", value: "quadraticEquation" },
            { name: "משוואת קו ישר", icon: "📏", value: "equationOfTheLine" },
            { name: "נגזרות", icon: "∂", value: "derivative" }
        ],
        wordProblem:[
            { name: "בעיות מילוליות", icon: "📖", value: "wordProblem" },
        ]
    };

    const clearCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas();
        } else {
            console.log("Canvas reference is not set.");
        }
    };

// לעשות בדיקות
    const updateCoinsOnExit = async () => {
        if (pendingUpdate && coinsCredits !== null) {
            try {
                const response = await axios.post(URL_SERVER_SIDE + `/update-coins/${username}&=${coinsCredits}`);
                console.log(response.data.error);
                console.log("Coins updated successfully!");
                pendingUpdate.current = false;
            } catch (error) {
                console.log("Failed to update coins: ", error);
            }
        }
    };


    useEffect(() => {
        updateCoinsOnExit()
    }, [coinsCredits, username]);


    const handleShowFullSolution = () =>{
        if (coinsCredits > 0){
            setCoinsCredits(prevCoins => prevCoins - 1)
            setShowFullSolution(true);
            pendingUpdate.current = true;
        }else {
            Swal.fire("Why can't you perform this action?", "You need coins 🪙 to perform this action.", "question");
        }
    }

    return (
        <div style={{display: "flex", alignItems: "flex-start"}}>

            <div className="sidebar">
                <Tooltip title="פרטים על הקטגוריה הפעילה">
                    <span>
                        <CategoryInfoCard activeCategory={activeCategoryHb}/>
                    </span>
                </Tooltip>
            </div>


            <div className="right-sidebar">
                <Tooltip title="פרטים למשתמש">
                    <span>
                        <UserInfoCard
                            category={category}
                            activeCategory={activeCategoryHb}
                            successStreaksByCategory={successStreaksByCategory}
                            coinsCredits={coinsCredits}
                            currentLevelByCategory={currentLevelByCategory}
                        />
                    </span>
                </Tooltip>
            </div>


            {isLevelUp && (
                <div className="loading-overlay">
                    <div className="loading-box">
                        <p>Level Up!
                            <StreaksLevelsAnimation/>
                        </p>
                    </div>
                </div>
            )}

            {isLevelDown && (
                <div className="loading-overlay">
                    <div className="loading-box">
                        <p>Level Down..
                            <LevelDownAnimation/>
                        </p>
                    </div>
                </div>
            )}


            <div className="home-container">
                <NotificationComponent username={username}/>
                <Typography className="title" variant="h3"
                            sx={{fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.3)"}}>
                    Online Learning 📖
                </Typography>

                <div className="category-selection">
                    <Typography variant="h4" sx={{
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        color: "purple",
                        marginTop: "25px"
                    }}>
                        Select Topic 📚️
                    </Typography>

                    <Tabs
                        value={selectedTopic || false}
                        onChange={(event, newValue) => setSelectedTopic(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        textColor="inherit"
                        sx={{
                            "& .Mui-selected": {
                                color: "yellow",
                                fontWeight: "bold"
                            }
                        }}
                    >
                        <Tab label="🧮 חשבון" value="invoice"/>
                        <Tab label="📖 בעיות מילוליות" value="wordProblem"/>
                        <Tab label="📐 מתמטיקה" value="math"/>
                    </Tabs>


                    <div style={{display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "15px"}}>
                        {subtopics[selectedTopic]?.map((sub) => (
                            <Card
                                key={sub.value}
                                onClick={() => handleCategorySelection(sub.value)}
                                style={{
                                    width: "150px",
                                    cursor: "pointer",
                                    textAlign: "center",
                                    backgroundColor: category === sub.value ? "yellow" : "#FFF",
                                    transition: "0.3s",
                                    borderRadius: "10px",
                                    padding: "10px"
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5">{sub.icon}</Typography>
                                    <Typography variant="subtitle1">{sub.name}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>


                <div className="question-section">
                    {question && (
                        <>
                            <h2 style={{marginTop: "15px"}}>
                                <mark style={{borderRadius: "15px"}}>Question:</mark>
                                {question.content.split('*').map((part, index) => (
                                    <React.Fragment key={index}>
                                        {part}
                                        {index < question.content.split('*').length - 1 && <br/>}
                                    </React.Fragment>
                                ))}
                            </h2>
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Enter your answer"
                                className="answer-input"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        if (userAnswer.trim()) {
                                            handleSubmitAnswer();
                                        }
                                    }
                                }}
                            />
                            <Tooltip
                                title={!userAnswer.trim() ? "הכנס תשובה כדי שהכפתור יפעל" : "אישור התשובה שלך, ושליחתה."}>
                                        <span>
                                          <button
                                              className={!userAnswer.trim() ? "submit-button-disabled" : "submit-button"}
                                              onClick={handleSubmitAnswer}
                                              disabled={!userAnswer.trim()}>
                                              Submit Answer
                                          </button>
                                        </span>
                            </Tooltip>

                            {showCanvas ? (
                                <>
                                    <div className="sketch-container">
                                        <ReactSketchCanvas
                                            ref={canvasRef}
                                            strokeWidth={3}
                                            strokeColor="black"
                                            allowOnlyPointerType="all"
                                        />
                                    </div>
                                    <Tooltip title="נקה לוח ציור">
                                        <span>
                                          <button className="clear-button" onClick={clearCanvas}>
                                              Clear Canvas
                                          </button>
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="הסתר לוח ציור">
                                        <span>
                                          <button className="clear-button" onClick={() => {
                                              setShowCanvas(false)
                                          }}>
                                              Hide Canvas
                                          </button>
                                        </span>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Tooltip title="פתח לוח ציור">
                                        <span>
                                           <button className="clear-button" onClick={() => {
                                               setShowCanvas(true)
                                           }}>
                                               Show Canvas
                                           </button>
                                        </span>
                                    </Tooltip>
                                </>
                            )}
                            <br/>

                            {!showFullSolution ? (

                                <Tooltip title=" 🪙 עולה מטבע אחד לבצע פעולה זו">
                                        <span>
                                            <button
                                                onClick={handleShowFullSolution}
                                                className="btn btn-outline-info">
                                                Full Solution With Steps
                                            </button>
                                        </span>
                                </Tooltip>

                            ) : (
                                question.steps && <SolutionSteps steps={question.steps}/>
                            )}


                            {!showExplanation &&
                                <Tooltip title=" הסבר קצר על התרגיל עם נוסחאות, ללא מטבעות">
                                        <span>
                                            <button
                                                className={"btn - btn-outline-info"}
                                                onClick={() => setShowExplanation(true)}>
                                                Show Explanation
                                            </button>
                                        </span>
                                </Tooltip>
                            }

                            {showExplanation && (
                                <>
                                    <Tooltip title=" הסתר את ההסבר">
                                        <span>
                                              <button onClick={() => setShowExplanation(false)}
                                                      className={"btn - btn-outline-info"}>
                                                  Hide Explanation
                                              </button>
                                        </span>
                                    </Tooltip>

                                    <div className="explanation">
                                        {question.explanation.split('*').map((part, index) => (
                                            <React.Fragment key={index}>
                                                {part}
                                                {index < question.explanation.split('*').length - 1 && <br/>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {(category && !isCountdownActive) && (
                        <Tooltip title=" קבל שאלה חדשה">
                            <span>
                                <button
                                    className={"btn - btn-outline-info"}
                                    onClick={handleNewQuestion}>
                                    Get New Question
                                </button>
                            </span>
                        </Tooltip>
                    )}

                    {isCountdownActive && (
                        <div>
                            <p>Next question in: {timer} seconds</p>
                            <Tooltip title=" עצור את קבלת השאלות, וצא מהקטגוריה הפעילה">
                            <span>
                                <button
                                    className={"btn - btn-outline-danger"}
                                    onClick={stopCountdown}>
                                    Stop Question
                                </button>
                            </span>
                            </Tooltip>
                        </div>
                    )}

                </div>

                {feedback &&
                    <div className={`feedback ${success ? "success" : "error"}`}>{
                        feedback}
                    </div>
                }
                {feedback && showSolution && (
                    <div className="solution">
                        <h3>The Solution is:</h3>
                        <p>{solution}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
