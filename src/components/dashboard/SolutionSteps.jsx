import { useState } from "react";


export default function SolutionSteps({ steps }){
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div>
            <h2>פתרון מודרך</h2>
            <p>{steps[currentStep].description}</p>
            {steps[currentStep].equation1 && <h3>{steps[currentStep].equation1}</h3>}
            {steps[currentStep].equation2 && <h3>{steps[currentStep].equation2}</h3>}
            <button onClick={nextStep} disabled={currentStep === steps.length - 1}>
                שלב הבא
            </button>
        </div>
    );
};
