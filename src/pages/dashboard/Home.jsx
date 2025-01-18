import {useRef, useState} from "react";
import axios from "axios";
import { URL_GET_QUESTION, URL_SERVER_SIDE, URL_SUBMIT_ANSWER} from "../../utils/Constants.js";
import { ReactSketchCanvas } from "react-sketch-canvas";
import LevelUpAnimation from "../../components/animation/LevelUpAnimation.jsx";
import "../../css/dashboard/HomeStyle.css"


export default function Home({username}){
    const[category, setCategory] = useState(null);
    const[question, setQuestion] = useState(null);
    const[userAnswer, setUserAnswer] = useState("");
    const[feedback, setFeedback] = useState(null);
    const[success, setSuccess] = useState(null);
    const[showExplanation,setShowExplanation] = useState(false);
    const [isLevelUp, setIsLevelUp] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const [showWordProblem, setShowWordProblem] = useState(false);
    const [showMath, setShowMath] = useState(false);
    const canvasRef = useRef();


    const handleCategorySelection = async (selectedCategory) =>{
        try {
            setCategory(selectedCategory);
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_QUESTION,{
                params: {username: username, category: selectedCategory}
            });

            setQuestion(response.data.questionDto);
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
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_QUESTION, {
                params: { username: username, category },
            });
            setQuestion(response.data.questionDto);
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


            if (response.data.levelUp){
                setIsLevelUp(true);
                setTimeout(() => {
                    setIsLevelUp(false);
                }, 3000);
            }
            setUserAnswer("");
            setQuestion("");
        } catch (error) {
            console.error("Error submitting answer:", error);
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
                            <LevelUpAnimation/>
                        </p>
                    </div>
                </div>
            )}

            <h1 className="title">Online Learning</h1>
            <div className="category-selection">
                <h2>Select Topic:</h2>
                <button onClick={() => (handleShowTopic("invoice"))}>חשבון</button>
                <button onClick={() => (handleShowTopic("wordProblem"))}>שאלות מילוליות</button>
                <button onClick={() => (handleShowTopic("math"))}>מתמטיקה</button>


                {showInvoice && (
                    <>
                        <h2>Select Category:</h2>
                        <button onClick={() => handleCategorySelection("addition")}>
                            Addition
                        </button>
                        <button onClick={() => handleCategorySelection("subtraction")}>
                            Subtraction
                        </button>
                        <button onClick={() => handleCategorySelection("multiplication")}>
                            Multiplication
                        </button>
                        <button onClick={() => handleCategorySelection("division")}>
                            Division
                        </button>
                    </>
                )}

                {showWordProblem && (
                    <>
                        <h2>Select Category:</h2>
                        <button onClick={() => handleCategorySelection("wordProblem")}>
                            Word Problem
                        </button>
                    </>
                )}

                {showMath && (
                    <>
                        <h2>Select Category:</h2>
                        <button onClick={() => handleCategorySelection("invoiceSeries")}>
                            Invoice Series
                        </button>
                        <button onClick={() => handleCategorySelection("quadraticEquation")}>
                            Quadratic Equation
                        </button>
                    </>
                )}
            </div>

            {category && <h3>Active Category: {category}</h3>}
            <div className="question-section">
                {question && (
                    <>
                    <h2>Question: {question.content}</h2>
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
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter your answer"
                        className="answer-input"
                    />
                    <button className="submit-button" onClick={handleSubmitAnswer}>Submit Answer</button>


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
                                {question.explanation}
                            </div>
                        </>
                    )}
                    </>
                )}

                {category && (
                    <button
                        className={"btn - btn-outline-info"}
                        onClick={handleNewQuestion}>
                        Get New Question
                    </button>
                )}

            </div>

            {feedback && <div className={`feedback ${success ? "success" : "error"}`}>{feedback}</div>}
        </div>
    );
}
