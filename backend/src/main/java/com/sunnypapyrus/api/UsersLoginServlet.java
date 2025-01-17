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
            UserEntity currentUser = userLogin.getUserByUsername(username);
            JsonObject userJson = new JsonObject();
            userJson.addProperty("userid", currentUser.getuserid());
            userJson.addProperty("username", currentUser.getUsername());
            userJson.addProperty("email", currentUser.getEmail());
            userJson.addProperty("firstName", currentUser.getFirstName());
            userJson.addProperty("lastName", currentUser.getLastName());
            userJson.addProperty("phoneNumber", currentUser.getPhoneNumber());
            userJson.addProperty("role", currentUser.getRole());
            jsonResponse.addProperty("user", userJson.toString());
            jsonResponse.addProperty("userRole", currentUser.getRole());
        }

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }
}