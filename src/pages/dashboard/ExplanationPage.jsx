import { Card, CardContent, Typography, Box } from "@mui/material";
import "../../css/dashboard/ExplanationStyle.css";

export default function ExplanationPage() {
    return (
        <Box className="explanation-container">
            <Typography variant="h3" sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                📘? מדריך המערכת - איך זה עובד
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2, maxWidth: "1000px", marginTop: "20px" }}>
                {cardsData.map((card, index) => (
                    <Card key={index} sx={{
                        width: "300px",
                        backgroundColor: "#f1f1f1",
                        borderRadius: "10px",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": { transform: "scale(1.05)" },
                        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.5)"
                    }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: "bold", color: "#1c79e1" }}>
                                {card.icon} {card.title}
                            </Typography>
                            <Typography sx={{ fontSize: "16px", color: "gray" }}>
                                {card.text}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}


const cardsData = [
    { icon: "🪙", title: "Coins - מטבעות", text: "מטבעות מרוויחים בכל עליית רמה. ניתן להשתמש בהם כדי לקנות פתרון מלא לתרגיל." },
    { icon: "🔥", title: "Streaks - רצף הצלחות", text: "סטרייקים הם רצף של תשובות נכונות. כל 10 סטרייקים מעניקים עליית רמה באותו תת-נושא ומטבע נוסף 🎉." },
    { icon: "⚠️", title: "Weak Points - נקודות חולשה", text: "אם טועים באותו נושא 5-6 פעמים, יורדים רמה באותו נושא." },
    { icon: "📈", title: "Level Up - עליית רמה", text: "כדי לעלות רמה, יש לצבור 10 סטרייקים ברצף. בכל רמה חדשה, השאלות נעשות קשות יותר!" },
    { icon: "📉", title: "Level Down - ירידת רמה", text: "ירידה ברמה מתרחשת לאחר 5-6 טעויות. אם יורדים רמה, צריך רק 5 סטרייקים כדי לחזור לרמה הקודמת!" },
    { icon: "❓", title: "Questions - שאלות", text: "בחר נושא, קבל שאלה, השתמש בלוח ציור 📜, קבל הסבר מפורט או פתרון מלא בתמורה למטבע!" },
    { icon: "📊", title: "Dashboard - לוח בקרה", text: "בדשבורד תוכל לצפות בהתקדמות שלך: רמות, הצלחות, טעויות, סטרייקים, אחוזי הצלחה, ושאלות שנענו או לא." },
    { icon: "⚙️", title: "System - מערכת החכמה", text: "חווית למידה מאתגרת ומהנה שמותאמת לכל רמה. התחילו לשחק ולהתקדם 🚀!" },
    { icon: "🛠️", title: "Panel - פאנל", text: "באיזור השאלות, יש פאנל שמכיל מידע על התת-נושא הנבחר, פאנל שמכיל מידע על הסטרייקים, מטבעות ורמה נוכחית באותו תת-נושא."}
];
