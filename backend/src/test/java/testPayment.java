import com.sunnypapyrus.models.UserList;
import com.sunnypapyrus.models.Payment;
import java.util.List;

public class testPayment {
    // Generate test case to test the addPayment method
    public static void main(String[] args) {
        UserList userList = new UserList();
        // Test the addPayment method
        boolean x = userList.addPayment("qwe", 
        "handsome", 
        1027, 
        "10/27", 
        "VISA", 
        123);
        
        if (x) {
            System.out.println("Test case 1 passed");
        } else {
            System.out.println("Test case 1 failed");
        }

        // Display all payment methods and details for the current logged-in user
        userList.setCurrentUser("qwe");
        List<Payment> payments = UserList.getCurrentUser().getPayments();
        for (Payment payment : payments) {
            System.out.println("Payment Method: " + payment.getpaymentMethod());
            System.out.println("Cardholder Name: " + payment.getcardholderName());
            System.out.println("Card Number: " + payment.getcardNumber());
            System.out.println("Expiry Date: " + payment.getexpiryDate());
            System.out.println("Card Type: " + payment.getcardType());
            System.out.println("CVV: " + payment.getCvv());
        }
    }
}
