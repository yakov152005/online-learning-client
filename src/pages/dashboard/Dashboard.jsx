import {useEffect, useState} from "react";
import axios from "axios";
import {URL_GET_DASHBOARD_USER, URL_SERVER_SIDE} from "../../utils/Constants.js";

export default function Dashboard({username}){
    const [streaks, setStreaks] = useState(null);
    const [openQuestions, setOpenQuestion] = useState(null);
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

    const fetchDashboardDetails = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_DASHBOARD_USER, {
                params: {
                    username: username
                }
            });

            if (response.data.success){
                const result = response.data;
                setStreaks(result.successStreak);
                setOpenQuestion(result.openQuestions);
                setWeakPoints(result.weakPoints);
                setCurrentLevels(result.currentLevels);
                setCorrectAnswersPerCategory(result.correctAnswersPerCategory);
                setIncorrectAnswersPerCategory(result.incorrectAnswersPerCategory);
                setSuccessRate(result.successRate);
                setTotalCorrectAnswers(result.totalCorrectAnswers);
                setTotalIncorrectAnswers(result.totalIncorrectAnswers);
                setTotalUnansweredQuestion(result.totalUnansweredQuestion);
                setTotalSuccessRate(result.totalSuccessRate);
            }else {
                console.log(response.data.success);
            }
        }catch (error){
            console.error("Error to fetching dashboard data!",error);
        }
    }

    useEffect(() => {
        console.log("Dashboard username:", username);
    }, [username]);

    useEffect(() => {
        if (username){
            fetchDashboardDetails();
        }
    }, [username]);


    return (
        <div>
            <div>
                {currentLevels && currentLevels.length > 0 ? (
                    <>
                        <h5 style={{color:"gray"}}>Current Levels:</h5>
                        {currentLevels.map(({category, level}) => (
                            <ul key={category}>
                                <li>
                                    <strong>Category:</strong> {category}
                                </li>
                                <li>
                                    <strong>Level:</strong> {level}
                                </li>
                            </ul>
                        ))}
                    </>
                ) : (
                    <p>No current levels available.</p>
                )}
            </div>

            <div>
                {streaks && streaks.length > 0 ? (
                    <>
                        <h5 style={{color: "gray"}}>Streaks:</h5>
                        {streaks.map(({category, successStreak}) => (
                            <ul key={category}>
                                <li>
                                    <strong>Category:</strong> {category}
                                </li>
                                <li>
                                    <strong>Success streaks: </strong> {successStreak}
                                </li>
                            </ul>
                        ))}
                    </>
                ) : (
                    <p>No Streaks available.</p>
                )}
            </div>

            <div>
                {weakPoints && weakPoints.length > 0 ? (
                    <>
                        <h5 style={{color: "gray"}}>Weak Points:</h5>
                        {weakPoints.map(({category, errorCount}) => (
                            <ul key={category}>
                                <li>
                                    <strong>Category:</strong> {category}
                                </li>
                                <li>
                                    <strong>Error Count: </strong> {errorCount}
                                </li>
                            </ul>
                        ))}
                    </>
                ) : (
                    <p>No Weak Points available.</p>
                )}
            </div>

            <div>
                {correctAnswersPerCategory && Object.keys(correctAnswersPerCategory).length > 0 ? (
                    <>
                        <h5 style={{color: "gray"}}>Correct Answers Per Category:</h5>
                        <ul>
                            {Object.entries(correctAnswersPerCategory).map(([category, correctAnswers]) => (
                                <li key={category}>
                                    <strong>Category:</strong> {category}, <strong>
                                    Correct Answers:</strong> {correctAnswers}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No correct answers available.</p>
                )}
            </div>

            <div>
                {incorrectAnswersPerCategory && Object.keys(incorrectAnswersPerCategory).length > 0 ? (
                    <>
                        <h5 style={{color: "gray"}}>Incorrect Answers Per Category:</h5>
                        <ul>
                            {Object.entries(incorrectAnswersPerCategory).map(([category, incorrectAnswers]) => (
                                <li key={category}>
                                    <strong>Category:</strong> {category}, <strong>
                                    Incorrect Answers:</strong> {incorrectAnswers}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No Incorrect answers available.</p>
                )}
            </div>

            <div>
                {successRate && Object.keys(successRate).length > 0 ? (
                    <>
                        <h5 style={{color: "gray"}}>Success Rate Per Category:</h5>
                        <ul>
                            {Object.entries(successRate).map(([category, success]) => (
                                <li key={category}>
                                    <strong>Category: </strong> {category},
                                    <strong> Success Rate: </strong> {success}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No Success rate available.</p>
                )}
            </div>

            <div>
                <h5 style={{color: "gray"}}>Total:</h5>
                <ul>
                    <li>
                        <strong>Correct answers:</strong> {totalCorrectAnswers}
                    </li>

                    <li>
                        <strong>Incorrect answers:</strong> {totalIncorrectAnswers}
                    </li>
                    <li>
                        <strong>Success Rate answers:</strong> {totalSuccessRate}
                    </li>
                    <li>
                        <strong>Unanswered Question:</strong> {totalUnansweredQuestion}
                    </li>

                </ul>
            </div>

            <button onClick={() => (setShowOpenQuestion(true))}>Show open question</button>

            {showOpenQuestion &&
                <div>
                    {openQuestions && openQuestions.length > 0 ? (
                        <>
                            <h5 style={{color: "gray"}}> Open Questions:</h5>
                            {openQuestions.map(({id, category, content, difficulty}) => (
                                <ul key={id}>
                                    <li>
                                        <p><strong>Category:</strong> {category}</p>
                                        <p><strong>Content: </strong> {content}</p>
                                        <p><strong>Level: </strong> {difficulty}</p>
                                    </li>
                                </ul>
                            ))}
                        </>
                    ) : (
                        <p>No Open Questions available.</p>
                    )}
                </div>
            }

        </div>
    );
}