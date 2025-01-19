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

@WebServlet("/api/admin/updatequantity")
public class UpdateQuantityServlet extends HttpServlet {
    private PurchaseRecord purchaseRecord = new PurchaseRecord();
    private Gson gson = new Gson();

    @Override
    public void init() throws ServletException {
        purchaseRecord = new PurchaseRecord();
        System.out.println("UpdateQuantityServlet initialized.");
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
            String bookID = jsonObject.get("bookId").getAsString();
            String quantity = jsonObject.get("newQuantity").getAsString();
            int x = Integer.parseInt(purchaseID);
            int y = Integer.parseInt(bookID);
            int z = Integer.parseInt(quantity);
            purchaseRecord.editCart(x, y, z);
            // purchaseRecord.setPurchaseByID(Integer.parseInt(purchaseID));
            // purchaseRecord.updateQuantity(Integer.parseInt(purchaseID),
            // Integer.parseInt(bookID), Integer.parseInt(quantity));
            response.getWriter().write(gson.toJson("Quantity updated successfully"));

        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(gson.toJson("Invalid purchaseID format"));
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(gson.toJson(e.getMessage()));
        }
    }
}