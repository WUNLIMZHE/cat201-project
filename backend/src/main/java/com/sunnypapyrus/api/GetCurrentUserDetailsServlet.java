package com.sunnypapyrus.api;

import com.google.gson.Gson;
import com.sunnypapyrus.models.UserEntity;
import com.sunnypapyrus.models.UserList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/users/getdetails")
public class GetCurrentUserDetailsServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        System.out.println("GetPaymentServlet initialized.");
        userList = new UserList();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Set response content type
        resp.setContentType("application/json");
        String username = req.getParameter("username");
        userList.setCurrentUser(username);

        // Reload the latest data
        userList.loadUsers();

        // Get current user
        UserEntity currentUser = UserList.getCurrentUser();
        if (currentUser == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\": \"User not logged in\"}");
            return;
        }

        // Convert payment to JSON
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(currentUser.getDetails());

        // Write response
        resp.getWriter().write(jsonResponse);
    }
}