package com.sunnypapyrus.api;

import com.google.gson.Gson;
import com.sunnypapyrus.models.OrderManagement;
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
    private OrderManagement orderManagement;

    @Override
    public void init() throws ServletException {
        orderManagement = new OrderManagement();
        System.out.println("AdminOrderManagementServlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        try {
            // Reload the latest Purchase records
            orderManagement.loadPurchaseRecords();
            List<PurchaseRecord> purchaseRecords = orderManagement.getPurchaseRecords();

            if (purchaseRecords.isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\": \"No purchase records found\"}");
                return;
            }

            String json = new Gson().toJson(purchaseRecords);
            resp.getWriter().write(json);
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"An error occurred while fetching purchase records\"}");
            e.printStackTrace();
        }
    }
}