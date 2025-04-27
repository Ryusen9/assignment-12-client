import React from "react";
import PropTypes from "prop-types";
const FixedBackground = ({ title, buttonContent, buttonIcon, bgImage, h, textColor }) => {
  return (
    <div
      className={`my-5 rounded-lg flex flex-col gap-8 items-center justify-center ${h} bg-cover bg-center bg-no-repeat bg-fixed`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div>
        <p className={`text-xl ${textColor} md:text-2xl lg:text-4xl font-bold `}>{title}</p>
      </div>
      <div>
        <button className="btn btn-primary btn-sm md:btn-md md:text-lg">
          {buttonContent}
          {buttonIcon}
        </button>
      </div>
    </div>
  );
};

FixedBackground.propTypes = {
  tittle: PropTypes.string.isRequired,
  buttonContent: PropTypes.string.isRequired,
  bgImage: PropTypes.string.isRequired,
  h: PropTypes.string.isRequired,
  buttonIcon: PropTypes.element,
};

export default FixedBackground;
