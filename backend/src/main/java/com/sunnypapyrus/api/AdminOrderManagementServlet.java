package com.sunnypapyrus.api;

import com.google.gson.Gson;
import com.sunnypapyrus.models.PurchaseRecord;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/admin/getorderdetails")
public class AdminOrderManagementServlet extends HttpServlet {
    private List<PurchaseRecord> purchaseRecords;

    @Override
    public void init() throws ServletException {
        System.out.println("Admin Order Management Servlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        try {
            purchaseRecords = PurchaseRecord.loadPurchaseRecords();
            Gson gson = new Gson();
            String json = gson.toJson(purchaseRecords);
            resp.getWriter().write(json);
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"An error occurred while fetching purchase records\"}");
            e.printStackTrace();
        }
    }
}