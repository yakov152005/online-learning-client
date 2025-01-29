import { Card, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function CategoryInfoCard({ activeCategory }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [description, setDescription] = useState("");

    const categoryMapping = {
        "חיבור": "addition",
        "חיסור": "subtraction",
        "כפל": "multiplication",
        "חילוק": "division",
        "בעיות מילוליות": "wordProblem",
        "סדרה חשבונית": "invoiceSeries",
        "משוואה ריבועית": "quadraticEquation",
        "משוואת קו הישר": "equationOfTheLine",
        "נגזרות": "derivative",
    };

    const categoryDescriptions = {
        addition: "חיבור הוא אחת מארבע פעולות החשבון הבסיסיות, שבה שתי מספרים או יותר מתווספים יחד.",
        subtraction: "חיסור היא הפעולה ההופכית לחיבור, המשמשת לקביעת ההפרש בין שני מספרים או יותר.",
        multiplication: "כפל הוא קיצור של חיבור חוזר של מספר זהה מספר פעמים.",
        division: "חילוק הוא הפעולה ההופכית לכפל, המשמשת לחלוקת מספר לקבוצות שוות.",
        wordProblem: "שאלות מילוליות מערבות הבנה מתמטית והפעלת לוגיקה לפתרון מצבים שונים.",
        invoiceSeries: "סדרה חשבונית היא סדרה שבה ההפרש בין שני איברים סמוכים הוא קבוע.",
        quadraticEquation: "משוואה ריבועית היא משוואה מהצורה ax²+bx+c=0 עם פתרונות המתקבלים מנוסחת השורשים.",
        equationOfTheLine: "משוואת קו הישר מתארת קו בגרף מתמטי ונכתבת בדרך כלל כ- y=mx+b.",
        derivative: "נגזרת היא מושג מרכזי בחשבון דיפרנציאלי  המתאר את קצב השינוי של פונקציה. הנוסחה מהצורה - f'(x)=ax²+bx",
    };


    useEffect(() => {
        const mappedCategory = categoryMapping[activeCategory] || null;
        if (mappedCategory && categoryDescriptions[mappedCategory]) {
            setDescription(categoryDescriptions[mappedCategory]);
        } else {
            setDescription("אין מידע על הקטגוריה שנבחרה.");
        }
    }, [activeCategory]);


    const handleMouseEnter = () => {
        setIsFlipped(true);
        setTimeout(() => {
            setIsFlipped(false);
        }, 3000);
    };

    return (
        <Box sx={{ perspective: "1000px", width: "320px", height: "800px", marginTop: "50px", marginLeft: "60px" }}>
            <Card
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s ease-in-out",
                    transform: isFlipped ? "rotateY(360deg)" : "rotateY(0deg)",
                    cursor: "pointer",
                    color: "white",
                    boxShadow: "5px 5px 15px rgba(0,0,0,0.5)",
                    borderRadius: "15px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url('https://img.lovepik.com/photo/45010/3400.jpg_wh860.jpg')`,
                }}
                onMouseEnter={handleMouseEnter}
            >
                <Typography variant="h5" sx={{ fontFamily: "'Shadows Into Light', cursive", fontSize: "26px",color:"blue"}}>
                    <strong>📖 תרגילים בנושא</strong>
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "'Indie Flower', cursive",
                        fontSize: "20px",
                        marginTop: "10px",
                        textAlign: "center",
                        color:"blue"
                    }}
                >
                    <strong>{activeCategory || "בחר קטגוריה"}</strong>
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "18px",
                        marginTop: "20px",
                        textAlign: "center",
                        whiteSpace: "pre-line",
                        color:"blue"
                    }}
                >
                    <strong>{description}</strong>
                </Typography>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50px",
                        fontSize: "14px",
                        opacity: 0.7,
                        fontFamily: "'Caveat', cursive",
                        color:"black"
                    }}
                >
                    <strong>✏️ לחץ על קטגוריה להצגת תרגילים נוספים</strong>
                </Box>
            </Card>
        </Box>
    );
}
