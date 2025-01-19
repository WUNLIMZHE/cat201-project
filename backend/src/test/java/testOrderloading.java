import com.sunnypapyrus.models.*;
import java.util.List;

public class testOrderloading {

    public static void main(String[] args) {
        List <PurchaseRecord> purchaseRecords = PurchaseRecord.loadPurchaseRecords();

        // for (PurchaseRecord purchaseRecord : purchaseRecords) {
        //     System.out.println(purchaseRecord.getPurchaseID());
        //     System.out.println(purchaseRecord.getUserID());
        //     System.out.println(purchaseRecord.getUsername());
        //     System.out.println(purchaseRecord.getPhone());
        //     System.out.println(purchaseRecord.getTotalAmount());
        //     System.out.println(purchaseRecord.getPaymentMethod());
        //     System.out.println(purchaseRecord.getPurchaseStatus());
        // }
        
        // if (x) {
        //     System.out.println("Purchase records loaded successfully");
        // } else {
        //     System.out.println("Failed to load purchase records");
        // }
    }
}