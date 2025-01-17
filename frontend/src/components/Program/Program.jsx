import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Program.css";

const Program = ({ programs }) => {
  return (
    <div className="programs">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-10 mx-10 md:mx-0">
        {programs.map((program, index) => (
          <Link key={index} className="program" to={program.link}>
            <div>
              <img src={program.mainImage} alt="" />
              <div className="caption">
                <img src={program.icon} alt="" />
                <p>{program.caption}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

Program.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      mainImage: PropTypes.string.isRequired, // Main image for the program
      icon: PropTypes.string.isRequired,      // Icon image for the program
      caption: PropTypes.string.isRequired,   // Caption text
      link: PropTypes.string.isRequired,      // Link for the program
    })
  ).isRequired,
};

export default Program;