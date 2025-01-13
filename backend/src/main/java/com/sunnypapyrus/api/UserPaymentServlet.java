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

@WebServlet("/api/users/payment")
public class UserPaymentServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        userList = new UserList();
        System.out.println("UserPaymentServlet initialized.");
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
        String cardNumber = jsonObject.has("cardNumber") ? jsonObject.get("cardNumber").getAsString() : null;
        String cardHolder = jsonObject.has("cardholderName") ? jsonObject.get("cardholderName").getAsString() : null;
        String cardType = jsonObject.has("cardType") ? jsonObject.get("cardType").getAsString() : null;
        String expiryDate = jsonObject.has("expiryDate") ? jsonObject.get("expiryDate").getAsString() : null;
        String cvv = jsonObject.has("cvv") ? jsonObject.get("cvv").getAsString() : null;

        // Validate fields
        if (username == null || cardNumber == null || cardHolder == null || expiryDate == null || cvv == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\": \"Missing required fields\"}");
            return;
        }

        // Add payment to user
        userList.addPayment(username, cardHolder, cardNumber, expiryDate, cardType, cvv);

        // Save users to file
        userList.saveUsers();

        // Send success response
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("{\"status\": \"Payment added successfully\"}");
    }
}
