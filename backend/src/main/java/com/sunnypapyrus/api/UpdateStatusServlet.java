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
@WebServlet("/api/admin/update")
public class UpdateStatusServlet extends HttpServlet {
    private PurchaseRecord purchaseRecord = new PurchaseRecord();
    private Gson gson = new Gson();

    @Override
    public void init() throws ServletException {
        purchaseRecord = new PurchaseRecord();
        System.out.println("UpdateStatusServlet initialized.");
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
            JsonObject jsonObject = gson.fromJson(sb.toString(), JsonObject.class);
            int purchaseID = jsonObject.get("purchaseID").getAsInt();
            String purchaseStatus = jsonObject.get("purchaseStatus").getAsString();
            
            // Update purchase status
            purchaseRecord.setPurchaseByID(purchaseID);
            purchaseRecord.updatePurchaseStatus(purchaseID, purchaseStatus);
            
            response.getWriter().write(gson.toJson("Order status updated successfully"));

        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(gson.toJson("Invalid purchaseID format"));
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(gson.toJson(e.getMessage()));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(gson.toJson("An error occurred: " + e.getMessage()));
        }
    }
}
