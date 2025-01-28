import Lottie from "lottie-react";
import loadingLineAnimation from "../../assets/animation/loading-line-animation.json"

export default function LoadingLineAnimation() {
    return (
        <Lottie
            animationData={loadingLineAnimation}
            loop={true}
            style={{ width: "500px", height: "500px", margin: "0 auto" }}
        />
    );
}