import Lottie from "lottie-react";
import React from "react";
import animationData from "/public/Lottie/login animation.json";
import { Helmet } from "react-helmet";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>BloodBond | Register</title>
        <meta name="description" content="Register to BloodBond" />
      </Helmet>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Lottie animationData={animationData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
