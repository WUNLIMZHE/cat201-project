import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/AdminSidebar/Sidebar";
import Swal from "sweetalert2";

// const languageOptions = [
//   { key: "chinese", value: "chinese", text: "Chinese" },
//   { key: "english", value: "english", text: "English" },
//   { key: "bahasa-melayu", value: "bahasa melayu", text: "Bahasa Melayu" },
// ];

// const categoryOptions = [
//   { key: "fiction", value: "fiction", text: "Fiction" },
//   { key: "historical", value: "historical", text: "Historical" },
//   { key: "non-fiction", value: "non-fiction", text: "Non-fiction" },
// ];

const AddBook = () => {
  const [htmlFormData, setHtmlFormData] = useState({
    title: "",
    isbn: "",
    author: "",
    language: "",
    category: "",
    genre: "",
    price: "",
    stock: "",
    image: null,
    description: "",
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHtmlFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const validImageTypes = [
      "image/jpeg", // jpg, jpeg
      "image/webp", // webp
      "image/gif", // gif
      "image/png", // png
    ];

    if (file && !validImageTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPG, JPEG, WEBP, GIF).");
      setHtmlFormData({ ...htmlFormData, image: null }); // Clear the invalid file from state
      e.target.value = null; // Reset the file input field
      return;
    }

    setHtmlFormData({ ...htmlFormData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !htmlFormData.title ||
      !htmlFormData.isbn ||
      !htmlFormData.author ||
      !htmlFormData.language ||
      !htmlFormData.category
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    // Convert the image to base64 if it's available
    let imageBase64 = "";
    if (htmlFormData.image) {
      const reader = new FileReader();
      reader.onloadend = async function () {
        imageBase64 = reader.result;

        // Send form data as JSON
        const formDataJson = {
          title: htmlFormData.title,
          isbn: htmlFormData.isbn,
          author: htmlFormData.author,
          language: htmlFormData.language,
          category: htmlFormData.category,
          genre: htmlFormData.genre,
          price: htmlFormData.price,
          stock: htmlFormData.stock,
          description: htmlFormData.description,
          image: imageBase64, // Send the image as a base64 string
        };

        console.log("Form Submitted", JSON.stringify(formDataJson));

        try {
          const response = await fetch("http://localhost:9000/books", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataJson), // Send as JSON
          });

          if (response.ok) {
            const result = await response.json();
            console.log(result.message); // Success message
            Swal.fire({
              icon: "success",
              title: "A new book is added",
              // text: "Thank you for purchasing! Kindly go to purchase history to check for your order status. Have a nice day!",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
            });
          } else {
            alert("Failed to add book");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while submitting the form");
        }
      };

      // Start reading the image as base64
      reader.readAsDataURL(htmlFormData.image);
    } else {
      // If no image, proceed without the image
      const formDataJson = {
        title: htmlFormData.title,
        isbn: htmlFormData.isbn,
        author: htmlFormData.author,
        language: htmlFormData.language,
        category: htmlFormData.category,
        genre: htmlFormData.genre,
        price: htmlFormData.price,
        stock: htmlFormData.stock,
        description: htmlFormData.description,
      };

      try {
        const response = await fetch("http://localhost:9000/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataJson), // Send as JSON
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message); // Success message
          Swal.fire({
            icon: "success",
            title: "A new book is added",
            text: "Thank you for purchasing! Kindly go to purchase history to check for your order status. Have a nice day!",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          });
        } else {
          alert("Failed to add book");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the form");
      }
    }
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <main className="flex-1 p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold lg:text-center mb-5">
            Add New Book
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto flex !flex-col gap-4 md:grid md:grid-cols-2 md:gap-8"
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="isbn" className="text-sm font-medium">
              ISBN <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="isbn"
              name="isbn"
              placeholder="Enter ISBN (without '-')"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="author" className="text-sm font-medium">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author name"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="language" className="text-sm font-medium">
              Language <span className="text-red-500">*</span>
            </label>
            <select
              id="language"
              name="language"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Select Language
              </option>
              <option value="chinese">Chinese</option>
              <option value="english">English</option>
              <option value="bahasa melayu">Bahasa Melayu</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-fiction</option>
              <option value="historical">Historical</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="genre" className="text-sm font-medium">
              Genre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Enter genre"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="stock" className="text-sm font-medium">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter stock"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm font-medium">
              Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddBook;
