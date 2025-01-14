//generate a servlet api for user to remove their choosen address from their account
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

@SuppressWarnings("unused")
@WebServlet("/api/users/removepayment")
public class RemovePaymentServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        userList = new UserList();
    }

    @Override
    protected void doDelete (HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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

        // Get the address to remove
        String payment = req.getParameter("payment");
        if (payment == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\": \"No payment provided\"}");
            return;
        }

        // Remove the address


        // Save the updated user
        userList.saveUsers();

        // Write response
        resp.getWriter().write("{\"success\": \"Payment removed\"}");
    }

}