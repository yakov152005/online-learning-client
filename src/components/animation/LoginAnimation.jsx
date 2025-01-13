import Lottie from "lottie-react";
import loginAnimation from "../../assets/animation/login-animation.json"

export default function LoginAnimation() {
    return (
        <Lottie
            animationData={loginAnimation}
            loop={true}
            style={{ width: "500px", height: "500px", margin: "0 auto" }}
        />
    );
}