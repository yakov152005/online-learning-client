import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/loading-animation.json"

export default function LoadingAnimation() {
    return (
        <Lottie
            animationData={loadingAnimation}
            loop={true}
            style={{ width: "500px", height: "500px", margin: "0 auto" }}
        />
    );
}