package com.sunnypapyrus.api;

import com.sunnypapyrus.models.UserEntity;
import com.sunnypapyrus.models.UserList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/api/users/deleteaddress")
public class RemoveAddressServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        userList = new UserList();
        System.out.println("RemoveAddressServlet initialized.");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        userList.loadUsers();
        // Set response content type
        response.setContentType("application/json");
        String username = request.getParameter("username");
        String addressid = request.getParameter("addressid"); // Fix parameter name

        if (username == null || username.isEmpty()) {
            response.getWriter().write("{\"error\": \"Username is required\"}");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        if (addressid == null || addressid.isEmpty()) {
            response.getWriter().write("{\"error\": \"Address ID is required\"}");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        UserEntity user = userList.getUserByUsername(username);
        if (user == null) {
            response.getWriter().write("{\"error\": \"User not found\"}");
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        boolean addressRemoved = userList.removeAddressById(username, addressid);
        if (!addressRemoved) {
            response.getWriter().write("{\"error\": \"Address not found\"}");
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        response.getWriter().write("{\"message\": \"Address deleted successfully\"}");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}