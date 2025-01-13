import {useEffect, useState} from "react";
import axios from "axios";
import {URL_GET_QUESTION, URL_SERVER_SIDE, URL_SUBMIT_ANSWER} from "../../utils/Constants.js";

export default function Home({username}){
    const[category, setCategory] = useState(null);
    const[question, setQuestion] = useState(null);
    const[userAnswer, setUserAnswer] = useState(null);
    const[feedback, setFeedback] = useState(null);
    const[success, setSuccess] = useState(null);
    const[showExplanation,setShowExplanation] = useState(false);


    useEffect(() => {
        console.log("Home username:", username);
    }, [username]);

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

            setSuccess(response.data.success);
            setFeedback(response.data.error);
            setUserAnswer("");
            setQuestion("");
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

    const handleExplanation = () => {
        setShowExplanation(true);
    }

    return (
        <div>
            <h1>Online Learning</h1>
            <div>
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
            </div>

            {category && <h3>Active Category: {category}</h3>}

            <div>
                {question && (
                    <div>
                        <h2>Question: {question.content}</h2>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Your answer"
                        />
                        <button onClick={handleSubmitAnswer}>Submit Answer</button>

                        <br/>
                        <button onClick={() => handleExplanation()}>
                            Show Explanation
                        </button>
                        {showExplanation && <div style={{color:"gray"}}>{question.explanation}</div> }
                    </div>
                )}
                <button onClick={handleNewQuestion}>Get New Question</button>
            </div>

            {feedback && <h3>Feedback: <div style={{color: success ? "green" : "red"}}>{feedback}</div></h3>}
        </div>
    );
}