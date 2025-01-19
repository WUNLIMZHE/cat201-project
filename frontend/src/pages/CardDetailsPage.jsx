// import Navbar from "../components/Navbar";
import Navbar from "../components/Navbar/Navbar";
import CardDetails from "../components/CardDetails";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import FooterContent from "../components/FooterContent/FooterContent";
import Footer from "../components/Footer/Footer";

function CardDetailsPage(data) {
  useEffect(() => {
    // Scroll to the top of the page on component mount
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only on mount

  const location = useLocation();
  console.log("Location State:", location.state); // Should show the full state object

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-8">
        <CardDetails data={location.state} />
      </div>
      <FooterContent />
      <Footer />
    </div>
  );
}

export default CardDetailsPage;
