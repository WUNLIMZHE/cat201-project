import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:9000"; // Replace with your backend's base URL

const AdminPage = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "" });
    const [editBook, setEditBook] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/books`);
            setBooks(response.data);
        } catch (err) {
            setError("Failed to fetch books. Please try again.");
            console.error(err);
        }
    };

    const handleAddBook = async () => {
        try {
            await axios.post(`${API_BASE_URL}/books`, newBook);
            setNewBook({ title: "", author: "" });
            fetchBooks();
        } catch (err) {
            setError("Failed to add the book. Please try again.");
            console.error(err);
        }
    };

    const handleEditBook = async () => {
        try {
            await axios.put(`${API_BASE_URL}/books/${editBook._id}`, editBook); // Assuming edit by `_id`
            setEditBook(null);
            fetchBooks();
        } catch (err) {
            setError("Failed to edit the book. Please try again.");
            console.error(err);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/books/${id}`);
            fetchBooks();
        } catch (err) {
            setError("Failed to delete the book. Please try again.");
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {/* Add Book Section */}
            <div>
                <h2>Add Book</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <button onClick={handleAddBook}>Add Book</button>
            </div>

            {/* Books List */}
            <div>
                <h2>Books</h2>
                <ul>
                    {books.map((book) => (
                        <li key={book._id}>
                            <strong>{book.title}</strong> by {book.author}
                            <button onClick={() => setEditBook(book)}>Edit</button>
                            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Edit Book Section */}
            {editBook && (
                <div>
                    <h2>Edit Book</h2>
                    <input
                        type="text"
                        value={editBook.title}
                        onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editBook.author}
                        onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                    />
                    <button onClick={handleEditBook}>Save Changes</button>
                    <button onClick={() => setEditBook(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
