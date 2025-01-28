import Lottie from "lottie-react";
import levelDown from "../../assets/animation/level-down-animation.json"

export default function LevelDownAnimation() {
    return (
        <Lottie
            animationData={levelDown}
            loop={true}
            style={{ width: "500px", height: "500px", margin: "0 auto" }}
        />
    );
}