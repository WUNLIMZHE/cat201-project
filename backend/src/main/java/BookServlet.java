import com.google.gson.Gson;
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
import java.util.List;

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

        // Handle file upload
        Part imagePart = req.getPart("image");
        if (imagePart != null) {
            // Get the filename from the uploaded file
            String fileName = "/src/assets/images/" + imagePart.getSubmittedFileName();
            // Set the target path to the frontend image folder
            Path imagePath = Paths.get("frontend", "src", "assets", "images", fileName);

            // Save the file to the target directory
            imagePart.write(imagePath.toString());
        }

        // Process the rest of the data
        Book book = gson.fromJson(req.getReader(), Book.class);
        List<Book> books = readBooksFromFile(req);
        book.setId(2);
        books.add(book);
        writeBooksToFile(req, books);

        // Respond with success
        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\": \"Book added successfully\"}");
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");
        Book updatedBook = gson.fromJson(req.getReader(), Book.class);

        List<Book> books = readBooksFromFile(req);
        for (int i = 0; i < books.size(); i++) {
            if (String.valueOf(books.get(i).getId()).equals(id)) {
                books.set(i, updatedBook);
                break;
            }
        }
        writeBooksToFile(req, books);

        resp.getWriter().write("{\"message\": \"Book updated successfully\"}");
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

    // Load all book items from books.json
    private JSONArray loadAllCartItems(HttpServletRequest req) {
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
        JSONArray bookItems = loadAllCartItems(req);
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
}
