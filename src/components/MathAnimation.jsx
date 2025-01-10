import Lottie from "lottie-react";
import mathAnimation from "../assets/math-animation.json"

export default function MathAnimation() {
    return (
        <Lottie
            animationData={mathAnimation}
            loop={true}
            style={{ width: "600px", height: "600px", margin: "0 auto" }}
        />
    );
}
