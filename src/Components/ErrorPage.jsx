import Lottie from "lottie-react";
import React from "react";
import animationData from "../../public/Lottie/Animation - 1748087105957.json";

const ErrorPage = () => {
  return (
    <div className="min-h-full min-w-full flex items-center justify-center overflow-hidden">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default ErrorPage;
