import Lottie from "lottie-react";
import levelUpAnimation from "../../assets/animation/level-up-animation.json"

export default function LevelUpAnimation() {
    return (
        <Lottie
            animationData={levelUpAnimation}
            loop={true}
            style={{ width: "500px", height: "500px", margin: "0 auto" }}
        />
    );
}