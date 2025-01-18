import { Link } from "react-router-dom";
import img1 from "/src/assets/images/book-1.webp";
import img2 from "/src/assets/images/book-9.webp";
import img3 from "/src/assets/images/book-7.webp";
import img4 from "/src/assets/images/book-2.webp";
import img5 from "/src/assets/images/book-45.webp";
import img6 from "/src/assets/images/book-12.webp";
import img7 from "/src/assets/images/book-42.webp";
import img8 from "/src/assets/images/book-40.webp";
import img9 from "/src/assets/images/book-37.webp";
import img0 from "/src/assets/images/book-44.webp";
export default function Gallery() {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 px-6">
      <section className="mt-[42px] grid md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 justify-data-center mb-10">
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img1} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img2} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img3} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img4} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img5} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img6} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img7} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img8} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img9} />
        </Link>
        <Link to="/books">
          <img className="w-full h-[220px] rounded-[10px]" src={img0} />
        </Link>
      </section>
    </div>
  );
}
