import { useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Brochure from "../components/Brochure/Brochure";
import Program from "../components/Program/Program";
import Title from "../components/Title/Title";
import Gallery from "../components/Gallery/Gallery"
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import FooterContent from "../components/FooterContent/FooterContent";
import search_program from "../assets/read-book.webp";
import cart_program from "../assets/bookstore-cashier.webp";
import order_program from "../assets/receive-book.webp";
import search_icon from "../assets/search.png";
import cart_icon from "../assets/shopping-cart.png";
import order_icon from "../assets/test.png";
import NavbarAdmin from "../components/NavbarAdmin/NavbarAdmin";
import update_icon from "../assets/stack-of-books.png";
import checklist_icon from "../assets/checklist.png";
import addbook_icon from "../assets/addbook.png";
import order_update_program from "../assets/book-update.webp";
import update_program from "../assets/packing-book.webp";
import addbook_program from "../assets/notification.webp";

const programsData = [
  {mainImage: search_program, icon: search_icon, caption: "Search", link: "/books",},
  {mainImage: cart_program, icon: cart_icon, caption: "Cart",link: "/view-my-cart",},
  {mainImage: order_program,icon: order_icon,caption: "Order",link: "/purchase-record",},
];

const adminProgramsData = [
  {mainImage: order_update_program, icon: checklist_icon, caption: "Order Management",link: "/order",},
  {mainImage: update_program,icon: update_icon,caption: "Inventory Management",link: "/orders",}, //Replace the link pls
  {mainImage: addbook_program,icon: addbook_icon,caption: "Add book",link: "/orders",},
];

export default function Home({userID, role}) {
  const titleRef = useRef(null);

  const scrollToTitle = () => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY + rect.top - 120; // Subtract 20px from the calculated scroll position
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* {localStorage.getItem("role") === 'user' ? <Navbar userID={userID} role={role}/> : <NavbarAdmin userID={userID} />} */}
      <Navbar userID={userID} role={role}/>
      <Brochure onExploreMore={scrollToTitle} />
      <div>
        <Title
          ref={titleRef}
          subTitle="What we have"
          title=" Your gateway to a world of imagination, knowledge, and inspiration, where every book shines like a ray of sunshine."
        />
        <Program programs={localStorage.getItem("role") === 'user' ? programsData : adminProgramsData}/>;
        <About />
        <Title subTitle="Gallery" title="Sunny Papyrus Best Seller" />
        <Gallery/>
      </div>
      <FooterContent/>
      <Footer/>
    </>
  );
}