import Lottie from "lottie-react";
import streaksLevels from "../../assets/animation/streaks_levels-animation.json"

export default function StreaksLevelsAnimation() {
    return (
        <Lottie
            animationData={streaksLevels}
            loop={true}
            style={{ width: "500px", height: "500px", margin: "0 auto" }}
        />
    );
}