import com.mongodb.client.*;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class BookDAO {
    private final MongoCollection<Document> bookCollection;

    public BookDAO(MongoClient mongoClient) {
        this.bookCollection = mongoClient.getDatabase("bookstore").getCollection("books");
    }

    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<>();
        for (Document doc : bookCollection.find()) {
            books.add(Book.fromDocument(doc));
        }
        return books;
    }

    public void addBook(Book book) {
        bookCollection.insertOne(book.toDocument());
    }

    public void updateBook(String id, Book book) {
        Document query = new Document("_id", id);
        Document update = new Document("$set", book.toDocument());
        bookCollection.updateOne(query, update);
    }

    public void deleteBook(String id) {
        bookCollection.deleteOne(new Document("_id", id));
    }
}
