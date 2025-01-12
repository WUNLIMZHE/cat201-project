// import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card/Card";
import PropTypes from "prop-types"; // Import PropTypes

// Layout for rendering food, tourist spots, and hotel cards
const CardsLayout = ({ products }) => {
  useEffect(() => {
    // Scroll to the top of the page on component mount
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only on mount

  const navigate = useNavigate();

  console.log(products);
  function createCard(card) {
    return (
      <Card
        key={card.id}
        id={card.id}
        userID = "1"
        title={card.title}
        rating={card.review}
        language={card.language}
        category={card.category}
        genre={card.genre}
        image={card.image}
        price={card.price}
        soldUnits={card.soldUnits}
        stock={card.stock}
        onClick={handleDetailsButtonClick}
      />
    );
  }

  function handleDetailsButtonClick(id) {
    console.log("Looking for details for cardid: ", id);
    const card = products.find((e) => e.id === id);
    console.log("Card found: ", card);
    if (card) {
      console.log("Card found!");
      navigate("/book/details", { state: { card } }); // Ensure the state is passed here
    } else {
      console.log("Event not found");
    }
  }

  return (
    <div className="mt-10 flex justify-center data-center min-h-auto">
      <section className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 justify-data-center mb-10">
        {products.length > 0 ? (
          products.map((product) => createCard(product))
        ) : (
          <p >No products available.</p>
        )}
      </section>
    </div>
  );
};

export default CardsLayout;

// Validate the 'data' prop
CardsLayout.propTypes = {
  products: PropTypes.array.isRequired, // Ensure data is an array and is required
};
