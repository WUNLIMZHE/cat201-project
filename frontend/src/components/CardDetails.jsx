import { Link } from "react-router-dom";
import "./CardDetails.css";

function CardDetails({ data }) {
  const card = data.card;

  let backToPage, backToLabel;

  console.log("Received data from card", data);

  // Split the details into paragraphs
  const paragraphs = card.description
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  console.log(paragraphs);
  return (
    <div className="max-w-5xl mx-auto px-8 mt-[128px]">
      <p>
        ←{" "}
        <Link to="/books" className="link hover:underline">
          View more Books
        </Link>
      </p>
      <article className="py-10 prose max-w-none">
        <img
          src={card.image}
          alt={`${card.title} book cover image`}
          className="sm:float-right mx-auto sm:ml-6 sm:mr-0 rounded shadow mb-5 max-w-[300px]"
          // width={card.category === "tourist-spot" ? "400px" : "360px"}
        />
        <h1 className="mb-3 text-4xl font-bold">{card.title}</h1>
        <div className="flex gap-2">
          <div className="badge border-0 p-3 font-bold text-white bg-theme-700 tag1">
            {card.language
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </div>
          <div className="badge border-0 p-3 font-bold text-black bg-theme-100 tag2">
            {card.category
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </div>
          <div className="badge border-0 p-3 font-bold text-black tag3">
            {card.genre
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </div>
        </div>
        <br />
        <div className="flex gap-x-3 mb-1">
          <div className="grid gap-1 items-center text-theme-800 content-start mt-1">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-xl"
              data-icon="ci:magnifying-glass"
            >
              <symbol id="ai:ci:magnifying-glass">
                <path
                  fill="currentColor"
                  d="M21 20l-4.35-4.35a8.5 8.5 0 1 0-1.42 1.42L20 21l1-1zM10 16a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
                ></path>
              </symbol>
              <use xlinkHref="#ai:ci:magnifying-glass"></use>
            </svg>
          </div>
          <div className="grid gap-1 items-center font-bold text-lg">
            <span>{card.isbn}</span>
          </div>
        </div>

        <div className="flex gap-x-3 mb-1">
          <div className="grid gap-1 items-center text-theme-800 content-start mt-1">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-xl"
              data-icon="communication:pen"
            >
              <symbol id="communication:pen">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 17.25V21h3.75L16.5 12.75l-3.75-3.75L3 17.25zM22 7.75l-3.75-3.75a2 2 0 0 0-2.82 0L14.83 6.09l3.75 3.75 3.75-3.75a2 2 0 0 0 0-2.82z"
                ></path>
              </symbol>
              <use xlinkHref="#communication:pen"></use>
            </svg>
          </div>
          <div className="grid gap-1 items-center font-bold text-lg content-start">
            <span>{card.author}</span>
          </div>
        </div>

        <div className="flex gap-x-3 mb-1">
          <div className="grid gap-1 items-center text-theme-800 content-start mt-1">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-xl"
              data-icon="rating:star"
            >
              <symbol id="rating:star">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                ></path>
              </symbol>
              <use xlinkHref="#rating:star"></use>
            </svg>
          </div>
          <div className="flex items-center font-bold text-lg">
            {card.review} / 5.0{" "}
            <span className="text-sm ml-2 text-gray-600">
              {card.soldUnits >= 1000
                ? `${(card.soldUnits / 1000).toFixed(1)}k`
                : card.soldUnits}
              {`  sold`}
            </span>
          </div>
        </div>
        <div className="flex gap-x-3 mb-1">
          <div className="grid gap-1 items-center text-theme-800 content-start mt-1">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-xl"
              data-icon="coin-dollar"
            >
              <symbol id="icon:coinDollar">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 7c-1.5 0-2.5 1-2.5 2.5S10.5 12 12 12s2.5 1 2.5 2.5S13.5 17 12 17"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="6"
                  x2="12"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </symbol>
              <use xlinkHref="#icon:coinDollar"></use>
            </svg>
          </div>
          <div className="grid gap-1 items-center font-bold text-lg content-start">
            <span>{`RM ${card.price.toFixed(2)}`}</span>
          </div>
        </div>
        <div className="flex gap-x-3 mb-5">
          <div className="grid gap-1 items-center text-theme-800 content-start mt-1">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-xl"
              data-icon="box-package"
            >
              <symbol id="icon:boxPackage">
                <path
                  d="M3 9l9-5 9 5-9 5-9-5z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M3 9v10l9 5 9-5V9"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M12 14v10"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </symbol>
              <use xlinkHref="#icon:boxPackage"></use>
            </svg>
          </div>
          <div className="grid gap-1 items-center font-bold text-lg content-start mt-1">
            <span>
              {card.stock >= 1000
                ? `${(card.stock / 1000).toFixed(1)}k`
                : card.stock}
              {`  stock left`}
            </span>
          </div>
        </div>
        {card.description.split("\n").map((line, index) => (
          <span key={index} className="text-gray-600">
            {line}
            <br />
            <br />
          </span>
        ))}
      </article>
    </div>
  );
}

export default CardDetails;
