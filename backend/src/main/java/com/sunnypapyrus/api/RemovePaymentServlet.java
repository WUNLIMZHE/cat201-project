package com.sunnypapyrus.api;

import com.sunnypapyrus.models.UserEntity;
import com.sunnypapyrus.models.UserList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet("/api/users/removepayment")
public class RemovePaymentServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        userList = new UserList();
        System.out.println("RemovePaymentServlet initialized.");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set response content type
        response.setContentType("application/json");
        String username = request.getParameter("username");
        String paymentid = request.getParameter("paymentid"); // Fix parameter name

        if (username == null || username.isEmpty()) {
            response.getWriter().write("{\"error\": \"Username is required\"}");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        if (paymentid == null || paymentid.isEmpty()) {
            response.getWriter().write("{\"error\": \"Payment ID is required\"}");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        UserEntity user = userList.getUserByUsername(username);
        if (user == null) {
            response.getWriter().write("{\"error\": \"User not found\"}");
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        boolean paymentRemoved = userList.removePaymentById(username, paymentid);
        if (!paymentRemoved) {
            response.getWriter().write("{\"error\": \"Payment not found\"}");
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        response.getWriter().write("{\"message\": \"Payment deleted successfully\"}");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}