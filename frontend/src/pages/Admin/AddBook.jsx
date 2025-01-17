import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/AdminSidebar/Sidebar";
import Swal from "sweetalert2";

const languageOptions = [
  { key: "chinese", value: "chinese", text: "Chinese" },
  { key: "english", value: "english", text: "English" },
  { key: "bahasa-melayu", value: "bahasa melayu", text: "Bahasa Melayu" },
];

const categoryOptions = [
  { key: "a", value: "a", text: "A" },
  { key: "b", value: "b", text: "B" },
  { key: "c", value: "c", text: "C" },
];

const AddBook = () => {
  const [htmlFormData, setHtmlFormData] = useState({
    title: "",
    isbn: "",
    author: "",
    language: "",
    category: "",
    genre: "",
    price: "",
    quantity: "",
    image: null,
    description: "",
  });

  const navigate = useNavigate();

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

    console.log("Form Submitted", htmlFormData);

    // Create a FormData object to send the image and other form data
    const formData = new FormData();
    formData.append("title", htmlFormData.title);
    formData.append("isbn", htmlFormData.isbn);
    formData.append("author", htmlFormData.author);
    formData.append("language", htmlFormData.language);
    formData.append("category", htmlFormData.category);
    formData.append("genre", htmlFormData.genre);
    formData.append("price", htmlFormData.price);
    formData.append("quantity", htmlFormData.quantity);
    formData.append("description", htmlFormData.description);

    // If an image is uploaded, append it as well
    if (htmlFormData.image) {
      formData.append("image", htmlFormData.image);
    }

    try {
      const response = await fetch("http://localhost:9000/books", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Success message
        Swal.fire({
          icon: "success", // This shows a green tick icon
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
          className="max-w-4xl mx-auto flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8"
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              onChange="handleChange(event)"
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="isbn" className="text-sm font-medium">
              ISBN
            </label>
            <input
              type="number"
              id="isbn"
              name="isbn"
              placeholder="Enter ISBN (without '-')"
              onChange="handleChange(event)"
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="author" className="text-sm font-medium">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author name"
              onChange="handleChange(event)"
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="language" className="text-sm font-medium">
              Language
            </label>
            <select
              id="language"
              name="language"
              onChange="handleChange(event)"
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
              Category
            </label>
            <select
              id="category"
              name="category"
              onChange="handleChange(event)"
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="genre" className="text-sm font-medium">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Enter genre"
              onChange="handleChange(event)"
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              onChange="handleChange(event)"
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              onChange="handleChange(event)"
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm font-medium">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              onChange="handleChange(event)"
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
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
