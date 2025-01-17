import com.sunnypapyrus.models.*;

public class testOrderloading {

    public static void main(String[] args) {
        OrderManagement orderManagement = new OrderManagement();
        orderManagement.loadPurchaseRecords();
        orderManagement.printPurchase();
        
        // if (x) {
        //     System.out.println("Purchase records loaded successfully");
        // } else {
        //     System.out.println("Failed to load purchase records");
        // }
    }
}