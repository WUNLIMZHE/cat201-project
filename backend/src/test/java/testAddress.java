import com.sunnypapyrus.models.Address;
import com.sunnypapyrus.models.UserList;
import com.sunnypapyrus.*;

import java.util.ArrayList;
import java.util.List;

import java.io.FileWriter;
import java.io.IOException;
import java.io.FileReader;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

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
        if (x) {
            System.out.println("Test case 1 passed");
        } else {
            System.out.println("Test case 1 failed");
        }
    }

}