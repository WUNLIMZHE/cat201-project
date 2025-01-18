import com.sunnypapyrus.models.*;
import java.util.List;

public class testOrderloading {

    public static void main(String[] args) {
        PurchaseRecord purchaseRecord = new PurchaseRecord();
        // Update the file path to match the actual file path
        List<PurchaseRecord> purchaseRecords = purchaseRecord.loadPurchaseRecords();
        boolean x = purchaseRecords != null;
    
        for (PurchaseRecord record : purchaseRecords) {
            System.out.println(record.getPurchaseID());
            System.out.println(record.getUserID());
            System.out.println(record.getUsername());
            System.out.println(record.getPhone());
            System.out.println(record.getTotalAmount());
            System.out.println(record.getPurchaseStatus());
            System.out.println(record.getFormattedPurchaseDate());
            for (CartItem book : record.getBooks()) {
                System.out.println("Book ID: " + book.getId());
                System.out.println("Title: " + book.getTitle());
                System.out.println("Price: " + book.getPrice());
                System.out.println("Purchase Unit: " + book.getPurchaseUnit());
                System.out.println("Total Price: " + book.getTotalPrice());
                System.out.println("Cart ID: " + book.getCartID());
                System.out.println("Genre: " + book.getGenre());
                System.out.println("Language: " + book.getLanguage());
                System.out.println("Stock: " + book.getStock());
                System.out.println("Category: " + book.getCategory());
                System.out.println("User ID: " + book.getUserID());
            }
        }
        
        // if (x) {
        //     System.out.println("Purchase records loaded successfully");
        // } else {
        //     System.out.println("Failed to load purchase records");
        // }
    }
}