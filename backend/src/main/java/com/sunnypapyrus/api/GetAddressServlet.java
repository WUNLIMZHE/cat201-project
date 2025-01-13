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

@WebServlet("/api/users/getaddress")
public class GetAddressServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        userList = new UserList();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Set response content type
        resp.setContentType("application/json");
        String username = req.getParameter("username");
        userList.setCurrentUser(username);
        // Get current user
        UserEntity currentUser = UserList.getCurrentUser();
        if (currentUser == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\": \"User not logged in\"}");
            return;
        }

        // Convert addresses to JSON
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(currentUser.getAddresses());

        // Write response
        resp.getWriter().write(jsonResponse);
    }
}
