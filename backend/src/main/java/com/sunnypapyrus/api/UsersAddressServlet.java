package com.sunnypapyrus.api;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sunnypapyrus.models.UserList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/users/address")
public class UsersAddressServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        userList = new UserList();
        System.out.println("UsersAddressServlet initialized.");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read request body
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }

        // Log the received JSON payload
        System.out.println("Received JSON payload: " + sb.toString());

        // Parse JSON request body
        Gson gson = new Gson();
        JsonObject jsonObject;
        try {
            jsonObject = gson.fromJson(sb.toString(), JsonObject.class);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\": \"Invalid JSON format\"}");
            return;
        }

        // Extract fields from JSON
        String username = jsonObject.has("username") ? jsonObject.get("username").getAsString() : null;
        String street = jsonObject.has("street") ? jsonObject.get("street").getAsString() : null;
        String city = jsonObject.has("city") ? jsonObject.get("city").getAsString() : null;
        String state = jsonObject.has("state") ? jsonObject.get("state").getAsString() : null;
        String zipcode = jsonObject.has("zipcode") ? jsonObject.get("zipcode").getAsString() : null;
        String country = jsonObject.has("country") ? jsonObject.get("country").getAsString() : null;

        // Validate fields
        if (username == null || street == null || city == null || state == null || zipcode == null || country == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\": \"Missing required fields\"}");
            return;
        }

        // Add address to user
        boolean success = userList.addAddress(username, street, city, state, zipcode, country);

        // // Reload the latest data
        // userList.loadUsers();

        // Add payment to currentUser
        userList.setCurrentUser(username);
        

        // Send response
        if (success) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"status\": \"Address added successfully\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\": \"Failed to add address\"}");
        }
    }
}