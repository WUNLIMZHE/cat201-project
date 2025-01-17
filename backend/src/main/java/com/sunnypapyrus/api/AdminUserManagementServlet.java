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
import java.util.List;

@WebServlet("/api/admin/getuserdetails")
public class AdminUserManagementServlet extends HttpServlet {
    private UserList userList;

    @Override
    public void init() throws ServletException {
        userList = new UserList();
        System.out.println("AdminUserManagementServlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        List<UserEntity> users = userList.getUsers();
        String json = new Gson().toJson(users);
        resp.getWriter().write(json);
    }
}