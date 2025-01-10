import com.sunnypapyrus.models.UserList;

public class testPayment {
    // Generate test case to test the addPayment method
    public static void main(String[] args) {
        UserList userList = new UserList();
        //Test the addPayment method
        boolean x = userList.addPayment("qwe", 
        "handsome", 
        1027, 
        "10/27", 
        "VISA", 
        123);
        
        // Test the removePayment method
        //boolean x = userList.removePayment("qwe",1);

        if (x) {
            System.out.println("Test case 1 passed");
        } else {
            System.out.println("Test case 1 failed");
        }
    }
}
