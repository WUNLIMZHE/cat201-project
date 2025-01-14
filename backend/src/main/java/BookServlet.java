import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

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
