import com.sunnypapyrus.models.UserList;


public class testAddress {
    // Generate test case to test the Address class
    public static void main(String[] args) {
        UserList userList = new UserList();
        // Test the addAddress method
        boolean x = userList.addAddress("qwe", "Apt 1",
                "San Francisco",
                "CA",
                "94105",
                "USA");

        // Test the removeAddress method
        //boolean x = userList.removeAddress("qwe", 1);

        if (x) {
            System.out.println("Test case 1 passed");
        } else {
            System.out.println("Test case 1 failed");
        }
    }

}