package com.sunnypapyrus.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sunnypapyrus.models.UserList;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/api/users/resetpassword")
public class ResetPasswordServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("ResetPasswordServlet initialized.");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

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
        String newPassword = jsonObject.get("newPassword").getAsString();

        System.out.println("ResetPasswordServlet POST request received with parameters: " + username + ", " + password);

        // Reset password
        UserList userList = new UserList();
        boolean resetStatus = userList.resetPassword(username, password, newPassword);

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("resetStatus", resetStatus);

        if (resetStatus) {
            jsonResponse.addProperty("message", "Password reset successfully.");
        } else {
            jsonResponse.addProperty("message", "Password Reset Failed. Current Password Incorrecct.");
        }

        // Send response
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            out.println(jsonResponse.toString());
        }
    }
}