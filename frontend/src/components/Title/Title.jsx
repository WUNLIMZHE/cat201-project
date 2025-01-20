import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Title.css";

const Title = React.forwardRef(({ subTitle, title }, ref) => {
  return (
    <div ref={ref} className="title mx-2 mt-8 md:mt-10 lg:mt-12">
      <p className="text-base md:text-lg lg:text-xl">{subTitle}</p>
      <h2 className="text-xl md:text-2xl lg:text-3xl mt-1 lg:mt-2">{title}</h2>
    </div>
  );
});

// Set display name for debugging
Title.displayName = "Title";

// Prop validation
Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default Title;
