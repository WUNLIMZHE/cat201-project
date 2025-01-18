import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


// public class PurchaseRecord {
//     private int purchaseID;
//     private int userID;

    /**
     * 1. Pending
    2. Confirmed
    3. Processing
    4. Shipped
    5. Out for Delivery
    6. Delivered
    7. Cancelled/Failed
    8. Returned/Refunded */
    private String purchaseStatus = "Pending";
    private double totalAmount;
    private String shippingAddress;
    private List<CartItem> books; // Using CartItem to store purchased books
    private LocalDateTime purchaseDate; // Store the purchase date and time

    // Constructor
    public PurchaseRecord(int purchaseID, int userID, double totalAmount, String shippingAddress, List<CartItem> books, LocalDateTime purchaseDate) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.books = books;
        this.purchaseDate = purchaseDate;
    }

    public PurchaseRecord(int purchaseID, int userID, double totalAmount, String shippingAddress, LocalDateTime purchaseDate) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.books = new ArrayList<CartItem>();  // Instantiate with ArrayList
        this.purchaseDate = purchaseDate;
    }

    public void addBook(CartItem book){
        books.add(book);
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    // Get formatted purchase date
    public String getFormattedPurchaseDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a");
        return purchaseDate.format(formatter);
    }
    
//     // Getters and Setters
//     public int getPurchaseID() {
//         return purchaseID;
//     }

//     public void setPurchaseID(int purchaseID) {
//         this.purchaseID = purchaseID;
//     }

//     public int getUserID() {
//         return userID;
//     }

//     public void setUserID(int userID) {
//         this.userID = userID;
//     }

//     public String getPurchaseStatus() {
//         return purchaseStatus;
//     }

//     public void setPurchaseStatus(String purchaseStatus) {
//         this.purchaseStatus = purchaseStatus;
//     }

//     public double getTotalAmount() {
//         return totalAmount;
//     }

//     public void setTotalAmount(double totalAmount) {
//         this.totalAmount = totalAmount;
//     }

//     public String getShippingAddress() {
//         return shippingAddress;
//     }

//     public void setShippingAddress(String shippingAddress) {
//         this.shippingAddress = shippingAddress;
//     }

//     public List<CartItem> getBooks() {
//         return books;
//     }

//     public void setBooks(List<CartItem> books) {
//         this.books = books;
//     }

//     // Method to display purchase record details
//     public void displayPurchaseRecord() {
//         System.out.println("Purchase ID: " + purchaseID);
//         System.out.println("User ID: " + userID);
//         System.out.println("Purchase Status: " + purchaseStatus);
//         System.out.println("Total Amount: $" + totalAmount);
//         System.out.println("Shipping Address: " + shippingAddress);
//         System.out.println("Books Purchased:");
//         for (CartItem book : books) {
//             System.out.println("  - Cart ID: " + book.getCartID());
//             System.out.println("    User ID: " + book.getUserID());
//             System.out.println("    Book ID: " + book.getId());
//             System.out.println("    Title: " + book.getTitle());
//             System.out.println("    Image: " + book.getImage());
//             System.out.println("    Genre: " + book.getGenre());
//             System.out.println("    Category: " + book.getCategory());
//             System.out.println("    Price: $" + book.getPrice());
//             System.out.println("    Units Purchased: " + book.getPurchaseUnit());
//             System.out.println("    Total Price: $" + book.getTotalPrice());
//             System.out.println("    Stock: " + book.getStock());
//             System.out.println("    Language: " + book.getLanguage());
//         }
//     }    
// }
