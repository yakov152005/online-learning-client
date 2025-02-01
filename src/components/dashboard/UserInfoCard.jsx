import "../../css/dashboard/HomeStyle.css"
import {Box, Card, Typography} from "@mui/material";
import React, {useState} from "react";

export default function UserInfoCard({category,activeCategory, successStreaksByCategory, coinsCredits,currentLevelByCategory}){
    const [isFlipped, setIsFlipped] = useState(false);

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
                    backgroundImage: `url('https://ih1.redbubble.net/image.5448965438.1373/st,small,507x507-pad,600x600,f8f8f8.jpg')`,
                    backgroundSize: "280%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"

                }}
                onMouseEnter={handleMouseEnter}
            >
                <Typography variant="h5" sx={{ fontFamily: "'Shadows Into Light', cursive", fontSize: "26px",color:"blue"}}>
                    <strong>🔍 מידע למשתמש </strong>
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "18px",
                        marginTop: "20px",
                        textAlign: "center",
                        whiteSpace: "pre-line",
                        color: "blue"
                    }}
                >
                    <h4 style={{marginTop: "15px"}}>
                        <mark style={{borderRadius: "15px"}}>Active Category:</mark>
                        <strong>{activeCategory}</strong>
                    </h4>

                    <h4 style={{marginTop: "35px"}}>
                        <mark style={{borderRadius: "15px"}}>Current Level 🚀:</mark>
                        <strong> {currentLevelByCategory[category] || 0}</strong>
                    </h4>

                    <h4 style={{marginTop: "35px"}}>
                        <mark style={{borderRadius: "15px"}}>Streaks 🔥:</mark>
                        <strong> {successStreaksByCategory[category] || 0}</strong>
                        <div style={{
                            color: successStreaksByCategory[category] > 4 ? "red" : "green",
                            marginTop: "10px"
                        }}>
                            {getStreakMessage(successStreaksByCategory[category] || 0)}

                        </div>
                    </h4>

                    <h4 style={{marginTop: "35px"}}>
                        <mark style={{borderRadius: "15px"}}>Coins 🪙:</mark>
                        <strong>{coinsCredits}</strong>
                    </h4>
                </Typography>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50px",
                        fontSize: "14px",
                        opacity: 0.7,
                        fontFamily: "'Caveat', cursive",
                        color: "black"
                    }}
                >
                    <strong>✏️ לחץ על קטגוריה להצגת מידע נוסף</strong>
                </Box>
            </Card>
        </Box>
    );
}