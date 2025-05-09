import React from "react";
import PropTypes from "prop-types";
const FixedBackground = ({
  title,
  buttonContent,
  buttonIcon,
  bgImage,
  h,
  textColor,
  id,
}) => {
  return (
    <div
      className={`my-5 rounded-lg flex flex-col gap-8 items-center justify-center ${h} bg-cover bg-center bg-no-repeat bg-fixed`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div>
        <p
          className={`text-xl ${textColor} md:text-2xl lg:text-4xl font-bold `}
        >
          {title}
        </p>
      </div>
      <div>
        <a href={id}>
          <button className="btn btn-primary btn-sm md:btn-md md:text-lg">
            {buttonContent}
            {buttonIcon}
          </button>
        </a>
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
  textColor: PropTypes.string,
  id: PropTypes.string,
};

export default FixedBackground;
