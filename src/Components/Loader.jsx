import React from "react";
import animationData from "/public/Lottie/Animation - 1748087421421.json";
import Lottie from "lottie-react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center absolute top-0 left-0">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loader;
