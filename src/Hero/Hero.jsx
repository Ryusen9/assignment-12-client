import React from "react";
import heroImg from "/public/Images/Hero/close-up-blood-test-omicron.jpg";

const Hero = () => {
  return (
    <div
      className="min-h-screen overflow-hidden flex items-center justify-center bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="min-h-screen w-full bg-black/50 flex flex-col items-center justify-center">
        <div className="flex flex-col text-slate-50 gap-6 items-center justify-center p-4">
          <p className="text-2xl lg:text-5xl text-center font-bold text-slate-50">
            Donate blood, Be someone's <br /> hero today
          </p>
          <p className="text-center text-xs md:text-sm lg:text-base">
            Every two seconds, someone in the world needs blood. <br /> Your
            donation can make the difference between life and death.
          </p>
        </div>
        <div>
            <button className="btn btn-sm md:btn-md text-slate-50 bg-rose-600 border-none shadow-amber-50">Donate now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
