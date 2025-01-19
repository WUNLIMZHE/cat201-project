import React, { useRef } from "react";
import Navbar from "../../components/NavbarAdmin/NavbarAdmin";
import Brochure from "../..//components/Brochure/Brochure";
import Program from "../../components/Program/Program";
import Title from "../../components/Title/Title";
import Gallery from "../../components/Gallery/Gallery"
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import order_program from "../../assets/book-update.webp";
import update_program from "../../assets/packing-book.webp";
import addbook_program from "../../assets/notification.webp";
import update_icon from "../../assets/stack-of-books.png";
import order_icon from "../../assets/checklist.png";
import addbook_icon from "../../assets/addbook.png";
import FooterContent from "../../components/FooterContent/FooterContent";

const programsData = [
  {mainImage: order_program, icon: order_icon, caption: "Order Management",link: "/order",},
  {mainImage: update_program,icon: update_icon,caption: "Inventory Management",link: "/orders",}, //Replace the link pls
  {mainImage: addbook_program,icon: addbook_icon,caption: "Add book",link: "/orders",},
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

  console.log(localStorage.getItem('userID'), localStorage.getItem('role'))
  return (
    <>
      <Navbar />
      <Brochure onExploreMore={scrollToTitle} />
      <div className="container">
        <Title
          ref={titleRef}
          subTitle="What we have"
          title=" Your gateway to a world of imagination, knowledge, and inspiration, where every book shines like a ray of sunshine."
        />
        <Program programs={programsData} />;
        <About />
        <Title subTitle="Gallery" title="Sunny Papyrus Best Seller" />
        <Gallery/>
      </div>
      <FooterContent/>
      <Footer/>
    </>
  );
}