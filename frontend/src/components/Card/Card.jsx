import Swal from "sweetalert2";
import { useState } from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ onClick, ...props }) => {
  const [isMouseOverImg, setIsMouseOverImg] = useState(false);
  const [isMouseOverBtn, setIsMouseOverBtn] = useState(false);

  function handleMouseOverImg() {
    setIsMouseOverImg(true);
  }

  function handleMouseLeaveImg() {
    setIsMouseOverImg(false);
  }

  function handleMouseOverBtn() {
    setIsMouseOverBtn(true);
  }

  function handleMouseLeaveBtn() {
    setIsMouseOverBtn(false);
  }

  const handleAddCart = async () => {
    console.log(`stock ${props.stock}`);

    if (props.stock <= 0) {
      // Show a warning if the stock is insufficient
      Swal.fire({
        icon: "warning",
        title: "Insufficient Stock",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    } else {
      // Data to send in POST request
      const cartData = {
        userID: props.userID,
        id: props.id,
        title: props.title,
        image: props.image,
        genre: props.genre,
        category: props.category,
        price: props.price,
        purchaseUnit: 1,
        totalPrice: props.price,
        stock: props.stock,
        language: props.language,
      };

      try {
        console.log(props.title);
        // Send a POST request to the backend
        const response = await fetch("http://localhost:9000/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData), // Send data as JSON
        });

        if (response.ok) {
          const result = await response.json();

          // Show success notification if the response contains valid JSON
          Swal.fire({
            icon: "success",
            title: "Book added to cart",
            text: `${props.title} has been added successfully!`,
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          });
        } else {
          // Handle non-OK responses (like 4xx or 5xx)
          const errorMessage = await response.text(); // Retrieve plain text for error message
          Swal.fire({
            icon: "error",
            title: "Failed to add to cart",
            text: errorMessage || "Something went wrong!",
            showCancelButton: false,
            confirmButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        // Handle error in the request
        Swal.fire({
          icon: "error",
          title: "Request failed",
          text: `${error.message}`,
          showCancelButton: false,
          confirmButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
        console.error(error);
      }
    }
  };

  return (
    <div
      className="group flex w-full min-w-[318px] max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:cursor-pointer"
      // onClick={() => onClick(props.id)}
    >
      <div
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        onClick={() => onClick(props.id)}
        onMouseEnter={handleMouseOverImg}
        onMouseLeave={handleMouseLeaveImg}
      >
        <img
          className={`peer absolute top-0 right-0 w-full object-cover ${
            isMouseOverImg && "opacity-70"
          }`}
          src={props.image}
          alt="product image"
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-24">
          <button
            className="btn btn-effect bg-theme-700 text-white gap-2 max-w-44 px-8 rounded-full text-lg group-hover:block border-0 transition leading-none hover:bg-theme-800 hover:scale-110
          "
            style={{
              color: isMouseOverImg ? "white" : "transparent",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.125rem",
              backgroundColor: isMouseOverImg
                ? isMouseOverBtn
                  ? "#0c3137"
                  : "#103f45"
                : "transparent",
              borderRadius: "9999px",
              paddingLeft: "32px",
              paddingRight: "32px",
              transform: isMouseOverBtn ? "scale(1.1)" : "scale(1)",
            }}
            onMouseEnter={handleMouseOverBtn}
            onMouseLeave={handleMouseLeaveBtn}
            onClick={() => props.onClick(props.id)}
          >
            See more
          </button>
        </div>
        {/* <img
          className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="product image"
        /> */}
        {/* <!-- <div className="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
      <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div> 
      <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
      <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
    </div> --> */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
          />
        </svg>
        {/* <!-- <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> --> */}
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">
          {props.title ? props.title : "title undefined"}
        </h5>
        <div className="card-actions mt-2 flex flex-wrap gap-2">
          <div className="badge border-0 p-3 font-bold text-white bg-theme-700 tag1">
            {props.language
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </div>
          <div className="badge border-0 p-3 font-bold text-black bg-theme-100 tag2">
            {props.category
              ? props.category.charAt(0).toUpperCase() + props.category.slice(1)
              : "Undefined"}
          </div>
        </div>

        <div className="flex items-center mt-2">
          {/* Loop to display stars */}
          {[...Array(5)].map((_, index) => {
            const fillPercentage = Math.min(
              Math.max((props.rating - index) * 100, 0),
              100
            ); // Calculate the fill percentage for the star
            return (
              <div
                key={index}
                className="relative w-4 h-4 me-1"
                style={{ position: "relative", display: "inline-block" }}
              >
                {/* Empty star */}
                <svg
                  className="absolute top-0 left-0 text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>

                {/* Filled star (partial shading using clip-path) */}
                <svg
                  className="absolute top-0 left-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                  style={{
                    clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                  }}
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
            );
          })}

          {/* Rating text */}
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {props.rating.toFixed(1)}
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>

        <div className="mt-2 flex items-around justify-between items-center">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              RM{props.price.toFixed(2)}
            </span>
            {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
          </p>
          <p>
            {props.soldUnits >= 1000
              ? `${(props.soldUnits / 1000).toFixed(1)}k`
              : props.soldUnits}{" "}
            sold
          </p>
        </div>
      </div>
      <div className="mt-auto mx-5" onClick={handleAddCart}>
        <div className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  language: PropTypes.string,
  category: PropTypes.string,
  rating: PropTypes.number,
  price: PropTypes.number,
  soldUnits: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default Card;
