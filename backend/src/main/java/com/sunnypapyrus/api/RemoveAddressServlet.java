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

import com.sunnypapyrus.models.Address;

@WebServlet("/api/users/deleteaddress")
public class RemoveAddressServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        userList = new UserList();
        System.out.println("RemoveAddressServlet initialized.");

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Set response content type
        resp.setContentType("application/json");
        String username = req.getParameter("username");
        if (username == null || username.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\": \"Username is required\"}");
            return;
        }
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
        String addressJson = req.getParameter("address");
        if (addressJson == null || addressJson.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\": \"No address provided\"}");
            return;
        }

        Address address = new Gson().fromJson(addressJson, Address.class);

        // Remove the address
        currentUser.removeAddress(address);

        // Save the updated user
        userList.saveUsers();

        // Write response
        resp.getWriter().write("{\"success\": \"Address removed\"}");
    }
}
