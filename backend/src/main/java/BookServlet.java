import com.mongodb.client.*;
import org.bson.Document;
import com.google.gson.Gson;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/books")
public class BookServlet extends HttpServlet {
    private BookDAO bookDAO;

    @Override
    public void init() throws ServletException {
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
        bookDAO = new BookDAO(mongoClient);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        List<Book> books = bookDAO.getAllBooks();

        resp.setContentType("application/json");
        resp.getWriter().write(new Gson().toJson(books));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Book book = new Gson().fromJson(req.getReader(), Book.class);
        bookDAO.addBook(book);

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\": \"Book added successfully\"}");
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Book book = new Gson().fromJson(req.getReader(), Book.class);
        String id = req.getParameter("id");
        bookDAO.updateBook(id, book);

        resp.getWriter().write("{\"message\": \"Book updated successfully\"}");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");
        bookDAO.deleteBook(id);

        resp.getWriter().write("{\"message\": \"Book deleted successfully\"}");
    }
}
