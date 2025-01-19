import React, { useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Brochure from "../components/Brochure/Brochure";
import Program from "../components/Program/Program";
import Title from "../components/Title/Title";
import Gallery from "../components/Gallery/Gallery"
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import search_program from "../assets/read-book.webp";
import cart_program from "../assets/bookstore-cashier.webp";
import order_program from "../assets/receive-book.webp";
import search_icon from "../assets/search.png";
import cart_icon from "../assets/shopping-cart.png";
import order_icon from "../assets/test.png";

const programsData = [
  {mainImage: search_program, icon: search_icon, caption: "Search", link: "/books",},
  {mainImage: cart_program, icon: cart_icon, caption: "Cart",link: "/view-my-cart",},
  {mainImage: order_program,icon: order_icon,caption: "Order",link: "/orders",},
];

export default function Home() {
  const titleRef = useRef(null);

  const scrollToTitle = () => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY + rect.top - 100; // Subtract 20px from the calculated scroll position
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />
      <Brochure onExploreMore={scrollToTitle} />
      <div>
        <Title
          ref={titleRef}
          subTitle="What we have"
          title=" Your gateway to a world of imagination, knowledge, and inspiration, where every book shines like a ray of sunshine."
        />
        <Program programs={programsData}/>;
        <About />
        <Title subTitle="Gallery" title="Sunny Papyrus Best Seller" />
        <Gallery/>
      </div>
      <Footer/>
    </>
  );
}