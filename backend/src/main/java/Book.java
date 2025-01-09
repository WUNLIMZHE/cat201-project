import org.bson.Document;

public class Book {
  private String _id; // Use MongoDB's _id
    private String title;
    private String author;
    private String isbn;
    private String image;
    private String genre;
    private double price;
    private double review;
    private int soldUnits;
    private int stock;

    // Constructors, getters, and setters
    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }

  public String getIsbn() {
    return isbn;
  }

  public Book(String id, String isbn, String title, String author, String genre, String image, double price, double review, int soldUnits, int stock) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.image = image;
    this.genre = genre;
    this.price = price;
    this.review = review;
    this.soldUnits = soldUnits;
    this.stock = stock;
  }

  public void setIsbn(String isbn) {
    this.isbn = isbn;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getGenre() {
    return genre;
  }

  public void setGenre(String genre) {
    this.genre = genre;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public double getReview() {
    return review;
  }

  public void setReview(double review) {
    this.review = review;
  }

  public int getSoldUnits() {
    return soldUnits;
  }

  public void setSoldUnits(int soldUnits) {
    this.soldUnits = soldUnits;
  }

  // Constructors
  public Book() {}

  // Getters and Setters
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getAuthor() { return author; }
  public void setAuthor(String author) { this.author = author; }

  // Convert MongoDB Document to Book Object
  public static Book fromDocument(Document doc) {
    return new Book(
        doc.getObjectId("_id").toString(),
        doc.getString("isbn"),
        doc.getString("title"),
        doc.getString("author"),
        doc.getString("genre"),
        doc.getString("image"),
        doc.getDouble("price"),
        doc.getDouble("review"),
        doc.getInteger("soldUnits"),
        doc.getInteger("stock")
    );
}

// Convert Book Object to MongoDB Document
public Document toDocument() {
    return new Document("_id", _id)
        .append("isbn", isbn)
        .append("title", title)
        .append("author", author)
        .append("genre", genre)
        .append("image", image)
        .append("price", price)
        .append("review", review)
        .append("soldUnits", soldUnits)
        .append("stock", stock);
}

}

