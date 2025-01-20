package com.sunnypapyrus.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;
import com.sunnypapyrus.models.PurchaseRecord;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/admin/getdetails")
public class GetOrderDetailServlet extends HttpServlet {
    private List<PurchaseRecord> purchaseRecords = new ArrayList<>();

    @Override
    public void init() throws ServletException {
        System.out.println("Admin Order Management Servlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        System.out.println("purchaseID in Servlet: " + req.getParameter("purchaseID"));

        String purchaseID = req.getParameter("purchaseID");
        if (purchaseID == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\": \"Missing purchaseID parameter\"}");
            return;
        }

        try {
            purchaseRecords = PurchaseRecord.loadPurchaseRecords();
            PurchaseRecord orderDetail = purchaseRecords.stream()
                    .filter(record -> String.valueOf(record.getPurchaseID()).equals(purchaseID))
                    .findFirst()
                    .orElse(null);

            if (orderDetail == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\": \"Order not found\"}");
            } else {
                // Create a custom Gson instance
                Gson gson = new GsonBuilder()
                    .registerTypeAdapter(LocalDateTime.class, (JsonSerializer<LocalDateTime>) (src, typeOfSrc, context) -> {
                        return context.serialize(src.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                    })
                    .create();

                String json = gson.toJson(orderDetail);
                resp.getWriter().write(json);
            }
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"An error occurred while fetching purchase records\"}");
            e.printStackTrace();
        }
    }
}