package com.sunnypapyrus.api;

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

@WebServlet("/api/users/current")
public class CurrentUserServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("CurrentUserServlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

        // Get current user
        UserEntity currentUser = UserList.getCurrentUser();

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        if (currentUser != null) {
            jsonResponse.addProperty("username", currentUser.getUsername());
            jsonResponse.addProperty("email", currentUser.getEmail());
            jsonResponse.addProperty("firstName", currentUser.getFirstName());
            jsonResponse.addProperty("lastName", currentUser.getLastName());
            jsonResponse.addProperty("loginStatus", true);
            // Add other user details as needed
        } else {
            jsonResponse.addProperty("error", "No current user logged in.");
            jsonResponse.addProperty("loginStatus", false);
        }

        // Send JSON response
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            out.println(jsonResponse.toString());
        }
    }
}
