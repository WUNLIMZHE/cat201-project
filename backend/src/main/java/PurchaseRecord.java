public class PurchaseRecord {
  private int purchaseID;
  private int userID;
  private int id; // Book ID
  private String title;
  private String image;
  private String genre;
  private String category;
  private double price;
  private int purchaseUnit;
  private double totalPrice;
  private int stock;
  private String status;
  private String language;

  // Constructor
  public PurchaseRecord(int purchaseID, int userID, int id, String title, String image, String genre,
                        String category, double price, int purchaseUnit, double totalPrice,
                        int stock, String status, String language) {
      this.purchaseID = purchaseID;
      this.userID = userID;
      this.id = id;
      this.title = title;
      this.image = image;
      this.genre = genre;
      this.category = category;
      this.price = price;
      this.purchaseUnit = purchaseUnit;
      this.totalPrice = totalPrice;
      this.stock = stock;
      this.status = status;
      this.language = language;
  }

  // Getters and Setters
  public int getPurchaseID() {
      return purchaseID;
  }

  public void setPurchaseID(int purchaseID) {
      this.purchaseID = purchaseID;
  }

  public int getUserID() {
      return userID;
  }

  public void setUserID(int userID) {
      this.userID = userID;
  }

  public int getId() {
      return id;
  }

  public void setId(int id) {
      this.id = id;
  }

  public String getTitle() {
      return title;
  }

  public void setTitle(String title) {
      this.title = title;
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

  public String getCategory() {
      return category;
  }

  public void setCategory(String category) {
      this.category = category;
  }

  public double getPrice() {
      return price;
  }

  public void setPrice(double price) {
      this.price = price;
  }

  public int getPurchaseUnit() {
      return purchaseUnit;
  }

  public void setPurchaseUnit(int purchaseUnit) {
      this.purchaseUnit = purchaseUnit;
  }

  public double getTotalPrice() {
      return totalPrice;
  }

  public void setTotalPrice(double totalPrice) {
      this.totalPrice = totalPrice;
  }

  public int getStock() {
      return stock;
  }

  public void setStock(int stock) {
      this.stock = stock;
  }

  public String getStatus() {
      return status;
  }

  public void setStatus(String status) {
      this.status = status;
  }

  public String getLanguage() {
      return language;
  }

  public void setLanguage(String language) {
      this.language = language;
  }

  // toString() Method for Debugging and Display
  @Override
  public String toString() {
      return "PurchaseRecord{" +
              "purchaseID=" + purchaseID +
              ", userID=" + userID +
              ", id=" + id +
              ", title='" + title + '\'' +
              ", image='" + image + '\'' +
              ", genre='" + genre + '\'' +
              ", category='" + category + '\'' +
              ", price=" + price +
              ", purchaseUnit=" + purchaseUnit +
              ", totalPrice=" + totalPrice +
              ", stock=" + stock +
              ", status='" + status + '\'' +
              ", language='" + language + '\'' +
              '}';
  }
}
