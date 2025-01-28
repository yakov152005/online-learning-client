export default function TextDashboardView({
                                               streaks,
                                               weakPoints,
                                               currentLevels,
                                               correctAnswersPerCategory,
                                               incorrectAnswersPerCategory,
                                               successRate,
                                               totalCorrectAnswers,
                                               totalIncorrectAnswers,
                                               totalUnansweredQuestion,
                                               totalSuccessRate
                                           }){
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
                        <strong>Unanswered Question:</strong> {totalUnansweredQuestion}
                    </li>
                    <li>
                        <strong>Success Rate answers:</strong> {totalSuccessRate}
                    </li>
                </ul>
            </div>
        </div>
    );
}
