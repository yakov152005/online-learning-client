import Lottie from "lottie-react";
import forgetPasswordAnimation from "../../assets/animation/forget-password-animation.json"

export default function ForgetPasswordAnimation() {
    return (
        <Lottie
            animationData={forgetPasswordAnimation}
            loop={true}
            style={{ width: "750px", height: "750px", margin: "0 auto" }}
        />
    );
}