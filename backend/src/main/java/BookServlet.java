import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.reflect.TypeToken;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.*;
import java.lang.reflect.Type;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;

@WebServlet("/books")
public class BookServlet extends HttpServlet {
    private static int nextBookID;
    private static final String RELATIVE_FILE_PATH = "/data/books.json"; // File path under webapp/data
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        List<Book> books = readBooksFromFile(req);

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(books));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Set character encoding and content type
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json; charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");

        // Ensure `nextBookID` is properly initialized
        if (nextBookID < 1) {
            loadNextBookID(req);
        }

        // Read and parse the JSON request body
        StringBuilder jsonContent = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonContent.append(line);
            }
        }
        JSONObject jsonRequest = new JSONObject(jsonContent.toString());

        // Extract fields from the JSON request
        int id = nextBookID;
        String title = jsonRequest.getString("title");
        long isbn = jsonRequest.getLong("isbn");
        String image = jsonRequest.getString("image");
        String author = jsonRequest.getString("author");
        String genre = jsonRequest.getString("genre");
        String category = jsonRequest.getString("category");
        String description = jsonRequest.getString("description");
        double price = jsonRequest.getDouble("price");
        int stock = jsonRequest.getInt("stock");
        String language = jsonRequest.getString("language");

        // Handle base64-encoded image
        if (image != null && !image.isEmpty()) {
            // Remove the data:image/png;base64, part
            String imageData = image.split(",")[1];

            // Decode the base64 string
            byte[] decodedImage = Base64.getDecoder().decode(imageData);

            // Set the target path to save the image
            String fileName = "book-" + id + ".webp";  // Example file name
            String projectDir = System.getProperty("user.dir"); // Get the current working directory
            Path imagePath = Paths.get(projectDir, "..", "frontend", "src", "assets", "images", fileName);

            // Write the decoded bytes to the file
            try (FileOutputStream fileOutputStream = new FileOutputStream(imagePath.toFile())) {
                fileOutputStream.write(decodedImage);
            } catch (IOException e) {
                e.printStackTrace();  // Handle the error accordingly
            }
        }
        image = "/src/assets/images/book-" + id + ".webp";
        System.out.println(image);

        // Load existing book items
        JSONArray bookItems = loadAllBookItems(req);

        // Check if the book with the same ID already exists in the book list
        boolean bookExists = false;
        for (int i = 0; i < bookItems.length(); i++) {
            JSONObject existingBookItem = bookItems.getJSONObject(i);
            if (existingBookItem.getInt("id") == id) {
                // Calculate the new purchase unit
                int newStock = stock;

                // Update purchaseUnit and totalPrice of the existing item
                existingBookItem.put("stock", newStock);
                bookExists = true;
                break;
            }
        }

        System.out.println("image before constructor" + image);
        if (!bookExists) {
            // Create and populate the new Book object
            Book newCartItem = new Book(id, title, isbn, image, author, genre, category, description, price, 0, 0, stock, language);

            // Convert the new cart item to JSON and add it to the array
            JSONObject newCartItemJson = new JSONObject();
            newCartItemJson.put("id", newCartItem.getId());
            newCartItemJson.put("title", newCartItem.getTitle());
            newCartItemJson.put("isbn", newCartItem.getIsbn());
            newCartItemJson.put("image", newCartItem.getImage());
            newCartItemJson.put("author", newCartItem.getAuthor());
            newCartItemJson.put("genre", newCartItem.getGenre());
            newCartItemJson.put("category", newCartItem.getCategory());
            newCartItemJson.put("description", newCartItem.getDescription());
            newCartItemJson.put("price", newCartItem.getPrice());
            newCartItemJson.put("review", newCartItem.getReview()); //0
            newCartItemJson.put("soldUnits", newCartItem.getSoldUnits()); //0
            newCartItemJson.put("stock", newCartItem.getStock());
            newCartItemJson.put("language", newCartItem.getLanguage());

            bookItems.put(newCartItemJson);
        }

        // Save the updated book items
        saveBookItems(bookItems, req);

        // increase ID by 1
        nextBookID++;

        // Respond with success message
        JSONObject responseJson = new JSONObject();
        responseJson.put("message", "Book added successfully!");
        resp.getWriter().write(responseJson.toString());
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Set character encoding
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json; charset=UTF-8");

        // Read and parse the JSON request body
        StringBuilder jsonContent = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonContent.append(line);
            }
        }

        // Convert JSON content to string
        String jsonString = jsonContent.toString();

        // Parse the JSON object to extract the "cart" array
        JSONObject rootObject = new JSONObject(jsonString); // Using org.json.JSONObject
        JSONArray cartArray = rootObject.getJSONArray("cart");

        // Convert the "cart" JSONArray to a JSON string
        String cartArrayString = cartArray.toString();

        // Convert the "cart" JSON string to a list of CartItem objects using Gson
        Type cartItemListType = new TypeToken<List<CartItem>>() {}.getType();
        List<CartItem> cartItems = gson.fromJson(cartArrayString, cartItemListType);

        // Read the books from storage (e.g., file or database)
        List<Book> books = readBooksFromFile(req);

        // Update the stock for each book in the cart
        for (CartItem cartItem : cartItems) {
            int cartBookId = cartItem.getId();
            int purchaseUnit = cartItem.getPurchaseUnit();

            for (Book book : books) {
                if (book.getId() == cartBookId) {
                    // Decrease the stock
                    int newStock = book.getStock() - purchaseUnit;

                    // Ensure stock doesn't go negative
                    if (newStock < 0) {
                        resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        resp.getWriter().write("{\"error\": \"Insufficient stock for book ID: " + cartBookId + "\"}");
                        return;
                    }

                    book.setStock(newStock);
                    break;
                }
            }
        }

        // Write the updated books back to storage
        writeBooksToFile(req, books);

        // Respond with a success message
        resp.getWriter().write("{\"message\": \"Stock updated successfully\"}");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");

        List<Book> books = readBooksFromFile(req);
        books.removeIf(book -> String.valueOf(book.getId()).equals(id));
        writeBooksToFile(req, books);

        resp.getWriter().write("{\"message\": \"Book deleted successfully\"}");
    }

    // Save all book items to books.json
    private void saveBookItems(JSONArray bookItems, HttpServletRequest req) {
        String filePath = getFilePath(req);
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filePath), "UTF-8"))) {
            writer.write(bookItems.toString());
        } catch (IOException e) {
            System.err.println("Error saving cart items:");
            e.printStackTrace();
        }
    }

    private List<Book> readBooksFromFile(HttpServletRequest req) {
        String filePath = getFilePath(req);
        try (Reader reader = new FileReader(filePath)) {
            Type bookListType = new TypeToken<ArrayList<Book>>() {}.getType();
            return gson.fromJson(reader, bookListType);
        } catch (IOException e) {
            e.printStackTrace();  // Log the error for debugging
            return new ArrayList<>();  // Return an empty list if the file reading fails
        }
    }

    // Load all book items from books.json
    private JSONArray loadAllBookItems(HttpServletRequest req) {
        JSONArray bookItems = new JSONArray();
        try {
            String filePath = getFilePath(req);
            File file = new File(filePath);
            if (file.exists()) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "UTF-8"));
                StringBuilder jsonContent = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    jsonContent.append(line);
                }
                reader.close();
                bookItems = new JSONArray(jsonContent.toString());
            }
        } catch (IOException e) {
            System.err.println("Error loading book items:");
            e.printStackTrace();
        }
        return bookItems;
    }

    private void loadNextBookID(HttpServletRequest req) {
        JSONArray bookItems = loadAllBookItems(req);
        if (bookItems.length() > 0) {
            JSONObject lastItem = bookItems.getJSONObject(bookItems.length() - 1);
            nextBookID = lastItem.getInt("id") + 1;
        } else {
            nextBookID = 1;
        }
    }

    private void writeBooksToFile(HttpServletRequest req, List<Book> books) {
        String filePath = getFilePath(req);
        try (Writer writer = new FileWriter(filePath)) {
            gson.toJson(books, writer);
        } catch (IOException e) {
            e.printStackTrace();  // Log the error for debugging
        }
    }

    private String getFilePath(HttpServletRequest req) {
        // System.out.println("REQ" + req);
        // Resolve the relative path to an absolute path based on the servlet context
        return getServletContext().getRealPath(RELATIVE_FILE_PATH);
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with the actual origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Add CORS headers to all responses
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with the actual origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        // Continue with the original method
        super.service(request, response);
    }
}
