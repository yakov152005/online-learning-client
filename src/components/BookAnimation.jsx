import Lottie from "lottie-react";
import bookAnimation from "../assets/book-animation.json"

export default function BookAnimation() {
    return (
        <Lottie
            animationData={bookAnimation}
            loop={true}
            style={{ width: "80px", height: "80px", margin: "0 auto" }}
        />
    );
}