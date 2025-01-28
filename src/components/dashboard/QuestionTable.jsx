import {Box, Card, CardContent, Grid2, Typography} from "@mui/material";
import "../../css/dashboard/StatisticsStyle.css";

export default function QuestionTable  ({ title, questions, onHide }){
    return (
        <Grid2 item xs={12}>
            <button
                className={"btn btn-outline-info"}
                onClick={onHide}
            >
                Hide {title}
            </button>
            {questions && questions.length > 0 ? (
                <Card>
                    <CardContent>
                        <Typography variant="h5" color="gray" gutterBottom>
                            {title}
                        </Typography>
                        <Box className="box-container-2">
                            <div className="table-container">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Content</th>
                                        <th>Difficulty</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {questions.map(({ id, category, content, difficulty }) => (
                                        <tr key={id}>
                                            <td>{category}</td>
                                            <td>{content.replace(/\*/g, ' ')}</td>
                                            <td>{difficulty}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Typography>No {title} Available.</Typography>
            )}
        </Grid2>
    );
};