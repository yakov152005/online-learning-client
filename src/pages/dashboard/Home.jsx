import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {
    FOR_NEW_QUESTION,
    SECOND, TIMER_LEVEL_DOWN,
    TIMER_LEVEL_UP,
    URL_GET_QUESTION,
    URL_SERVER_SIDE,
    URL_SUBMIT_ANSWER
} from "../../utils/Constants.js";
import { ReactSketchCanvas } from "react-sketch-canvas";
import LevelUpAnimation from "../../components/animation/LevelUpAnimation.jsx";
import "../../css/dashboard/HomeStyle.css"
import LevelDownAnimation from "../../components/animation/LevelDownAnimation.jsx";
import StreaksLevelsAnimation from "../../components/animation/StreaksLevelsAnimation.jsx";


export default function Home({username}){
    const[category, setCategory] = useState(null);
    const[question, setQuestion] = useState(null);
    const[userAnswer, setUserAnswer] = useState("");
    const[feedback, setFeedback] = useState(null);
    const[success, setSuccess] = useState(null);
    const[showExplanation,setShowExplanation] = useState(false);
    const [isLevelUp, setIsLevelUp] = useState(null);
    const [isLevelDown, setIsLevelDown] = useState(null);
    const [successStreaksByCategory, setSuccessStreaksByCategory] = useState({});
    const [showInvoice, setShowInvoice] = useState(false);
    const [showWordProblem, setShowWordProblem] = useState(false);
    const [showMath, setShowMath] = useState(false);
    const canvasRef = useRef();
    const [timer, setTimer] = useState(null);
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    const countdownInterval = useRef(null);
    const [showCanvas, setShowCanvas] = useState(false);
    const [solution,setSolution] = useState("");
    const [showSolution, setShowSolution] = useState(false);
    const [activeCategoryHb, setActiveCategoryHb] = useState("");




    const handleCategorySelection = async (selectedCategory) =>{
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

            const response = await axios.get(URL_SERVER_SIDE + URL_GET_QUESTION, {
                params: { username: username, category },
            });

            setQuestion(response.data.questionDto);
            setSuccessStreaksByCategory(prevState => ({
                ...prevState,
                [category]: response.data.successStreak || 0
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
                    userAnswer: String(userAnswer),
                    username: username,
                },
            });
            console.log("Server response:", response.data);

            setSuccess(response.data.success);
            setFeedback(response.data.error);
            setIsLevelUp(response.data.levelUp);
            setIsLevelDown(response.data.levelDown);
            setSuccessStreaksByCategory(response.data.successStreaksByCategory);

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
        } catch (error) {
            console.error("Error submitting answer:", error);
        }finally {
            startCountdown();
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
        }
    };


    const handleShowTopic = (topic) => {
        setCategory("");
        setUserAnswer("");
        setQuestion("");
        switch (topic){
            case "invoice":
                setShowInvoice(true);
                setShowWordProblem(false);
                setShowMath(false);
                break;
            case "wordProblem":
                setShowWordProblem(true);
                setShowInvoice(false);
                setShowMath(false);
                break;
            case "math":
                setShowMath(true);
                setShowWordProblem(false);
                setShowInvoice(false);
                break;
            default:
                return;
        }
    }

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

    const streakMessages = [
        { min: 1, max: 3, message: "💫 Nice 💫️" },
        { min: 3, max: 5, message: "⚡️ Excellent ⚡️" },
        { min: 5, max: 7, message: "🔥 On Fire 🔥" },
        { min: 7, max: 9, message: "☄️ Wow Amazing ☄️" },
        { min: 9, max: 10, message: "💥🔥 Boom! One More For Level Up 🔥💥" },
    ];

    const getStreakMessage = (streak) => {
        const messageObj = streakMessages.find(
            (range) => streak >= range.min && streak < range.max
        );
        return messageObj ? messageObj.message : "";
    };

    const clearCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas();
        } else {
            console.log("Canvas reference is not set.");
        }
    };

    return (
        <div className="home-container">
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

            <h1 className="title">Online Learning</h1>
            <div className="category-selection">
                <h2 style={{marginTop: "15px"}}>
                    <mark style={{borderRadius: "15px"}}>Select Topic:</mark>
                </h2>

                <button onClick={() => (handleShowTopic("invoice"))}>חשבון</button>
                <button onClick={() => (handleShowTopic("wordProblem"))}>שאלות מילוליות</button>
                <button onClick={() => (handleShowTopic("math"))}>מתמטיקה</button>


                {showInvoice && (
                    <>
                        <h2 style={{marginTop: "15px"}}>
                            <mark style={{borderRadius: "15px"}}>Select Category:</mark>
                        </h2>
                        <button onClick={() => handleCategorySelection("addition")}>
                            חיבור
                        </button>
                        <button onClick={() => handleCategorySelection("subtraction")}>
                            חיסור
                        </button>
                        <button onClick={() => handleCategorySelection("multiplication")}>
                            כפל
                        </button>
                        <button onClick={() => handleCategorySelection("division")}>
                            חילוק
                        </button>
                    </>
                )}

                {showWordProblem && (
                    <>

                        <h2 style={{marginTop: "15px"}}>
                            <mark style={{borderRadius: "15px"}}>Select Category:</mark>
                        </h2>
                        <button onClick={() => handleCategorySelection("wordProblem")}>
                            בעיות מילוליות
                        </button>
                    </>
                )}


                {showMath && (
                    <>
                        <h2 style={{marginTop: "15px"}}>
                            <mark style={{borderRadius: "15px"}}>Select Category:</mark>
                        </h2>
                        <button onClick={() => handleCategorySelection("invoiceSeries")}>
                            סדרה חשבונית
                        </button>
                        <button onClick={() => handleCategorySelection("quadraticEquation")}>
                            משוואה ריבועית
                        </button>
                        <button onClick={() => handleCategorySelection("equationOfTheLine")}>
                            משוואת קו ישר
                        </button>
                        <button onClick={() => handleCategorySelection("derivative")}>
                            נגזרות
                        </button>
                    </>
                )}
            </div>

            {category &&
                <h3 style={{marginTop: "15px"}}>
                    <mark style={{borderRadius: "15px"}}>Active Category:</mark>
                    {activeCategoryHb}
                </h3>
            }

            {category && (
                <h3 style={{marginTop: "35px"}}>
                    <mark style={{borderRadius: "15px"}}>Streaks 🔥: </mark>
                    {successStreaksByCategory[category] || 0}
                    <div style={{color: successStreaksByCategory[category] > 4 ? "red" : "green", marginTop: "10px"}}>
                        {getStreakMessage(successStreaksByCategory[category] || 0)}
                    </div>
                </h3>
            )}

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
                    <button
                        className={!userAnswer.trim() ? "submit-button-disabled" : "submit-button"}
                        onClick={handleSubmitAnswer}
                        disabled={!userAnswer.trim()}
                    >
                        Submit Answer
                    </button>
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
                            <button className="clear-button" onClick={clearCanvas}>
                                Clear Canvas
                            </button>
                            <button className="clear-button" onClick={() => {
                                setShowCanvas(false)
                            }}>
                                Hide Canvas
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="clear-button" onClick={() => {
                                setShowCanvas(true)
                            }}>
                                Show Canvas
                            </button>
                        </>
                    )

                    }

                    <br/>

                    {!showExplanation && <button
                        className={"btn - btn-outline-info"}
                        onClick={() => setShowExplanation(true)}>
                        Show Explanation
                    </button>
                    }

                    {showExplanation && (
                        <>
                            <button onClick={() => setShowExplanation(false)}
                                    className={"btn - btn-outline-info"}
                            >Hide Explanation
                            </button>
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
                    <button
                        className={"btn - btn-outline-info"}
                        onClick={handleNewQuestion}>
                        Get New Question
                    </button>
                )}

                {isCountdownActive && (
                    <div>
                    <p>Next question in: {timer} seconds</p>
                        <button
                            className={"btn - btn-outline-danger"}
                            onClick={stopCountdown}>
                            Stop Question
                        </button>
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
    );
}
