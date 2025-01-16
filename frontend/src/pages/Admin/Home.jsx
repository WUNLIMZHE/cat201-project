import React, { useRef } from "react";
//import Navbar from "../../components/Navbar/Navbar";
import Brochure from "../..//components/Brochure/Brochure";
//import Program from ".../../components/Program/Program";
import Title from "../../components/Title/Title";
import Gallery from "../../components/Gallery/Gallery"
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";

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
      {/* <Navbar /> */}
      <Brochure onExploreMore={scrollToTitle} />
      <div className="container">
        <Title
          ref={titleRef}
          subTitle="What we have"
          title=" Your gateway to a world of imagination, knowledge, and inspiration, where every book shines like a ray of sunshine."
        />
        {/* <Program /> */}
        <About />
        <Title subTitle="Gallery" title="Sunny Papyrus Best Seller" />
        <Gallery/>
      </div>
      <Footer/>
    </>
  );
}