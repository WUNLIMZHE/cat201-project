package com.sunnypapyrus.api;

import com.sunnypapyrus.models.PurchaseRecord;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.BufferedReader;


@WebServlet("/api/admin/updatetotal")
public class UpdateTotalPriceServlet extends HttpServlet {
    private PurchaseRecord purchaseRecord = new PurchaseRecord();
    private Gson gson = new Gson();

    @Override
    public void init() throws ServletException {
        purchaseRecord = new PurchaseRecord();
        System.out.println("UpdateTotalPriceServlet initialized.");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");

        // Read request body
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }

        try {
            // Parse JSON request body
            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(sb.toString(), JsonObject.class);
            String purchaseID = jsonObject.get("purchaseID").getAsString();
            String totalAmount = jsonObject.get("totalAmount").getAsString();
            int x = Integer.parseInt(purchaseID);
            double y = Double.parseDouble(totalAmount);
            System.out.println("purchaseID: " + x + " totalAmount: " + y);
            purchaseRecord.editTotalAmount(x, y);
            response.getWriter().write(gson.toJson("Total amount updated successfully"));
        } catch (Exception e) {
            response.getWriter().write(gson.toJson("Error updating total amount"));
        }
    }
}