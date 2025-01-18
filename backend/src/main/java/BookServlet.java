import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.reflect.TypeToken;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;

@WebServlet("/books")
public class BookServlet extends HttpServlet {
    private static final String RELATIVE_FILE_PATH = "/data/books.json"; // File path under webapp/data
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        List<Book> books = readBooksFromFile(req);

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(books));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Book book = gson.fromJson(req.getReader(), Book.class);
        List<Book> books = readBooksFromFile(req);
        books.add(book);
        writeBooksToFile(req, books);

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\": \"Book added successfully\"}");
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
