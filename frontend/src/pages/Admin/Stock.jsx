import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/AdminSidebar/Sidebar";
// import books from "../../data/bookData";
import "./Order.css";

const chunkbooks = (books, chunkSize) => {
  const result = [];
  for (let i = 0; i < books.length; i += chunkSize) {
    result.push(books.slice(i, i + chunkSize));
  }
  return result;
};

const Stock = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChunk, setCurrentChunk] = useState(0);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // To store list of books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [filteredBooks, setFilteredBooks] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products
  // const [filters, setFilters] = useState({ languages: [], categories: [] });

  const updateFilteredBooks = () => {
    setFilteredBooks(
      products.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.isbn.toString().includes(searchQuery)
      )
    );
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/books");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data); // Store the list of books in state
    } catch (err) {
      setError(err.message); // Capture error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchProducts();
    // Cleanup function
    return () => {
      setLoading(false); // Optional: to stop loading if component unmounts
    };
  }, []);

  useEffect(() => {
    setFilteredBooks(products);
  }, [products]);

  const chunkedBooks = chunkbooks(filteredBooks, 10);

  const handleDeleteBook = (id) => {
    // Show a confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(JSON.stringify({ id }));
        // Send DELETE request to backend with the ID in the request body
        fetch("http://localhost:9000/books", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // Send the ID as a JSON object
        })
          .then((response) => {
            if (response.ok) {
              // Notify user of successful deletion
              Swal.fire("Deleted!", "The book has been deleted.", "success");
              // Refresh or update UI here
              fetchProducts();
            } else {
              Swal.fire(
                "Error",
                "There was a problem deleting the book. Please try again.",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "Something went wrong while communicating with the server.",
              "error"
            );
            console.error(error);
          });
      }
    });
  };

  const handleChangeStock = (id, originalStock) => {
    // Create the Swal dialog
    Swal.fire({
      title: "Change Stock",
      html: `
        <p>Original Stock: <strong>${originalStock}</strong></p>
        <label for="newStock">New Stock:</label>
        <input type="number" id="newStock" class="swal2-input" placeholder="Enter new stock" value="${originalStock}">
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const newStock = document.getElementById("newStock").value;
        // Validate the stock value to ensure it's not negative
        if (newStock < 0) {
          Swal.showValidationMessage("Stock value cannot be negative");
          return null; // Prevent submission if validation fails
        }
        return newStock;
      },
      didClose: () => {
        const newStock = document.getElementById("newStock")?.value;
        if (newStock !== originalStock) {
          // Warn user to save changes if they close the dialog without saving
          Swal.fire({
            title: "Unsaved Changes",
            text: "You have unsaved changes. Are you sure you want to leave without saving?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Leave without saving",
            cancelButtonText: "Stay and save",
          }).then((result) => {
            if (!result.isConfirmed) {
              // If user chooses to stay, keep the Swal dialog open
              handleChangeStock(id, originalStock);
            }
          });
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newStock = document.getElementById("newStock").value;

        // Save the new stock value via PATCH request to the backend
        fetch(`http://localhost:9000/books`, {
          method: "PATCH", // Use PATCH for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id, // Pass the book ID
            stock: newStock, // Pass the updated stock value
          }),
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire("Saved!", "The stock has been updated.", "success");
              fetchProducts();
            } else {
              Swal.fire(
                "Error",
                "There was a problem updating the stock.",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "Something went wrong while communicating with the server.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="book-container">
      {/* <Sidebar /> */}
      <main className="book-content">
        <div className="header flex-col md:flex-row">
          <h1 className="font-semibold text-3xl mb-3 md:mb-0">Stock</h1>
          <input
            type="text"
            placeholder="Search by book ID, ISBN, or author"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateFilteredBooks();
            }}
            className="search-bar"
          />
        </div>

        {filteredBooks.length === 0 ? (
          <div className="no-results">No books found.</div>
        ) : (
          <>
            <div className="pagination mb-5">
              <button
                onClick={() => setCurrentChunk(currentChunk - 1)}
                disabled={currentChunk === 0}
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentChunk(currentChunk + 1)}
                disabled={currentChunk === chunkedBooks.length - 1}
              >
                Next
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Book Title</th>
                  <th>ISBN</th>
                  <th>Author</th>
                  <th>Sold Units</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {chunkedBooks[currentChunk].map((book) => (
                  <tr
                    key={book.id}
                    // onClick={() =>
                    //   navigate(`/books/${book.id}`, { state: { book } })
                    // }
                    // className="clickable-row"
                  >
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.isbn}</td>
                    <td>{book.author}</td>
                    <td>{book.soldUnits}</td>
                    <td>{book.stock}</td>
                    <td className="flex items-center content-center space-x-5">
                      {/* <!-- Delete Book Icon --> */}
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-6 h-6 text-gray-700 p-1 rounded-md group-hover:bg-red-100 group-hover:text-red-500 hover:cursor-pointer transition-colors duration-200"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                        </svg>
                        {/* <!-- Tooltip --> */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                          Delete Book
                        </div>
                      </div>

                      {/* <!-- Add Book Icon --> */}
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-6 h-6 text-gray-700 p-1 rounded-md group-hover:bg-green-100 group-hover:text-green-500 hover:cursor-pointer transition-colors duration-200 mt-1 md:mt-0 mr-5 md:mr-0"
                          onClick={() => handleChangeStock(book.id, book.stock)}
                        >
                          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                        </svg>
                        {/* <!-- Tooltip --> */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                          Add Book
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default Stock;
