import com.sunnypapyrus.models.UserList;

public class testRegister {
    // Generate test case to test the Register class
    public static void main(String[] args) {
        UserList userList = new UserList();
        // Test the addUser method
        boolean x = userList.registerUser("sunnypapyrus", "password", "Sunny", "Papyrus", "1234567890",
                "chewhong@gmail.com");
        if (x) {
            System.out.println("Test case 1 passed");
        } else {
            System.out.println("Test case 1 failed");
        }
    }
}