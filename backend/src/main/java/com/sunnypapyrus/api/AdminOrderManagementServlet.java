package com.sunnypapyrus.api;

import com.google.gson.Gson;
import com.sunnypapyrus.models.PurchaseRecord;
import com.sunnypapyrus.models.UserEntity;
import com.sunnypapyrus.models.UserList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/users/getorder")
public class AdminOrderManagementServlet extends HttpServlet {
    private List<PurchaseRecord> purchaseRecords;
    private UserList userList;
    private UserEntity user;

    @Override
    public void init() throws ServletException {
        userList = new UserList(); // Initialize userList
        System.out.println("Admin Order Management Servlet initialized.");
        //open purchase.json and read file
        purchaseRecords = PurchaseRecord.loadPurchaseRecords();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();
        String json = gson.toJson(purchaseRecords);
        resp.getWriter().write(json);
    }

}