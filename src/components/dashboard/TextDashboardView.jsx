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
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>

            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#555" }}>📊 Current Levels:</h4>
                {currentLevels && currentLevels.length > 0 ? (
                    <ul style={{ marginLeft: "20px" }}>
                        {currentLevels.map(({ category, level }) => (
                            <li key={category}>
                                <strong>Category:</strong> {category} | <strong>Level:</strong> {level}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "#888" }}>No current levels available.</p>
                )}
            </div>


            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#555" }}>🔥 Streaks:</h4>
                {streaks && streaks.length > 0 ? (
                    <ul style={{ marginLeft: "20px" }}>
                        {streaks.map(({ category, successStreak }) => (
                            <li key={category}>
                                <strong>Category:</strong> {category} | <strong>Success Streak:</strong> {successStreak}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "#888" }}>No streaks available.</p>
                )}
            </div>


            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#555" }}>⚠️ Weak Points:</h4>
                {weakPoints && weakPoints.length > 0 ? (
                    <ul style={{ marginLeft: "20px" }}>
                        {weakPoints.map(({ category, errorCount }) => (
                            <li key={category}>
                                <strong>Category:</strong> {category} | <strong>Error Count:</strong> {errorCount}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "#888" }}>No weak points available.</p>
                )}
            </div>


            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#555" }}>✅ Correct Answers Per Category:</h4>
                {correctAnswersPerCategory && Object.keys(correctAnswersPerCategory).length > 0 ? (
                    <ul style={{ marginLeft: "20px" }}>
                        {Object.entries(correctAnswersPerCategory).map(([category, correctAnswers]) => (
                            <li key={category}>
                                <strong>Category:</strong> {category} | <strong>Correct Answers:</strong> {correctAnswers}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "#888" }}>No correct answers available.</p>
                )}
            </div>


            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#555" }}>❌ Incorrect Answers Per Category:</h4>
                {incorrectAnswersPerCategory && Object.keys(incorrectAnswersPerCategory).length > 0 ? (
                    <ul style={{ marginLeft: "20px" }}>
                        {Object.entries(incorrectAnswersPerCategory).map(([category, incorrectAnswers]) => (
                            <li key={category}>
                                <strong>Category:</strong> {category} | <strong>Incorrect Answers:</strong> {incorrectAnswers}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "#888" }}>No incorrect answers available.</p>
                )}
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#555" }}>📈 Success Rate Per Category:</h4>
                {successRate && Object.keys(successRate).length > 0 ? (
                    <ul style={{ marginLeft: "20px" }}>
                        {Object.entries(successRate).map(([category, success]) => (
                            <li key={category}>
                                <strong>Category:</strong> {category} | <strong>Success Rate:</strong> {" "}
                                {parseFloat(success).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "#888" }}>No success rate data available.</p>
                )}
            </div>


            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#555" }}>📋 Total Summary:</h4>
                <ul style={{ marginLeft: "20px" }}>
                    <li>
                        <strong>Correct Answers:</strong> {totalCorrectAnswers}
                    </li>
                    <li>
                        <strong>Incorrect Answers:</strong> {totalIncorrectAnswers}
                    </li>
                    <li>
                        <strong>Unanswered Questions:</strong> {totalUnansweredQuestion}
                    </li>
                    <li>
                        <strong>Overall Success Rate:</strong> {" "}{parseFloat(totalSuccessRate).toFixed(2)}%
                    </li>
                </ul>
            </div>
        </div>
    );
}
