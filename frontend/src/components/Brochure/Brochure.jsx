// import React from 'react'
import "./Brochure.css";
import searchGreen from "../../assets/search_iconGreen.png";
// import { Link } from "react-router-dom";

const Brochure = ({ onExploreMore }) => {
  return (
    <div className="brochure container">
      <div className="brochure-text">
        <h1 className="text-4xl md:text-5xl lg:text-6xl">Sunny Papyrus</h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl">Welcomes You</h2>
        <p className="text-base md:text-lg lg:text-xl mt-2 md:mt-3 lg:mt-4">
        Welcome to Sunny Papyrus, your online bookstore where stories come to life. Explore a 
        variety of books, from timeless classics to the latest releases, all at your fingertips.
        Let every visit spark curiosity, inspire ideas, and brighten your day with new discoveries. 
        Happy reading! 📚
        </p>
        <button
          onClick={onExploreMore}
          className="btn hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          <img src={searchGreen} alt="" className="search-icon"/> Explore More
        </button>
      </div>
    </div>
  );
};

export default Brochure;