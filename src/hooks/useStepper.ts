import { useState } from "react";

export const useStepper = (maxStep: number) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < maxStep) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  return {
    step,
    nextStep,
    prevStep
  }
}