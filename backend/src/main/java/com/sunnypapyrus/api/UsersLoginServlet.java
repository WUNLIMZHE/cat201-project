package com.sunnypapyrus.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sunnypapyrus.models.UserEntity;
import com.sunnypapyrus.models.UserList;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/api/users/login")
public class UsersLoginServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersLoginServlet initialized.");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        // Read request body
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }

        // Parse JSON request body
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(sb.toString(), JsonObject.class);
        String username = jsonObject.get("username").getAsString();
        String password = jsonObject.get("password").getAsString();

        System.out.println("UsersLoginServlet POST request received with parameters: " + username + " = " + password);

        // Validate user login
        UserList userLogin = new UserList();
        boolean loginStatus = userLogin.loginUser(username, password);

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("loginStatus", loginStatus);

        if (loginStatus) {
            // Debug: check if login is successful
            System.out.println("Login successful! Sent back to UsersLoginServlet");
        
            // Debug: Ensure that the user was retrieved successfully
            UserEntity currentUser = userLogin.getUserByUsername(username);
            if (currentUser == null) {
                System.out.println("Error: User not found for username: " + username);
            } else {
                System.out.println("User found: " + currentUser.getUsername());
            }
        
            // Debug: Check if the user has addresses
            if (currentUser.getAddresses() == null || currentUser.getAddresses().isEmpty()) {
                System.out.println("Error: User has no addresses.");
            } else {
                System.out.println("User address count: " + currentUser.getAddresses().size());
            }
        
            // Debug: Create user JSON object
            JsonObject userJson = new JsonObject();
            userJson.addProperty("userid", currentUser.getuserid());
            System.out.println("UserID: " + currentUser.getuserid()); // Debug userID
            
            userJson.addProperty("username", currentUser.getUsername());
            System.out.println("Username: " + currentUser.getUsername()); // Debug username
            
            userJson.addProperty("email", currentUser.getEmail());
            System.out.println("Email: " + currentUser.getEmail()); // Debug email
            
            userJson.addProperty("firstName", currentUser.getFirstName());
            System.out.println("FirstName: " + currentUser.getFirstName()); // Debug firstName
            
            userJson.addProperty("lastName", currentUser.getLastName());
            System.out.println("LastName: " + currentUser.getLastName()); // Debug lastName
            
            userJson.addProperty("phoneNumber", currentUser.getPhoneNumber());
            System.out.println("PhoneNumber: " + currentUser.getPhoneNumber()); // Debug phoneNumber
            
            userJson.addProperty("role", currentUser.getRole());
            System.out.println("Role: " + currentUser.getRole()); // Debug role
            
            // Debug: Check address retrieval
            String address = "";
            System.out.println("Addresses list size: " + currentUser.getAddresses().size());
            if (currentUser.getAddresses() != null && !currentUser.getAddresses().isEmpty()) {
                address = currentUser.getAddresses().get(0).getStreet() + ", "
                        + currentUser.getAddresses().get(0).getzipcode() + " "
                        + currentUser.getAddresses().get(0).getCity() + ", "
                        + currentUser.getAddresses().get(0).getState() + ", "
                        + currentUser.getAddresses().get(0).getCountry();
            } else {
                System.out.println("Error: No address found for the user.");
            }
            System.out.println("Address: " + address); // Debug address
        
            // Debug: Add user information to JSON response
            userJson.addProperty("address", address);
            jsonResponse.addProperty("user", userJson.toString());
        
            // Debug: Check userRole
            jsonResponse.addProperty("userRole", currentUser.getRole());
            System.out.println("User Role in Response: " + currentUser.getRole()); // Debug role in response
        
            // Debug: Check if user information is added to the response
            jsonResponse.add("user", userJson);
            System.out.println("Added user information to jsonResponse.");
        
            // Debug: Print out retrieved info for verification
            System.out.println("Retrieved info = " + currentUser.getuserid() + " " + currentUser.getRole() + " " + currentUser);
        }        

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }
}