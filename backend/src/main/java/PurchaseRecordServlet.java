import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;

@WebServlet("/purchase-record")
public class PurchaseRecordServlet extends HttpServlet {
    private static final String PURCHASED_RECORD_FILE = "/data/purchase.json"; // File path for purchased records

    // Default constructor (no parameters)
    public PurchaseRecordServlet() {
        // This constructor is required for the servlet container to instantiate the servlet
    }

    // Load all purchased records from purchased_records.json
    private JSONArray loadAllPurchasedRecords(HttpServletRequest request) {
        // Load the purchased records from a file or database
        // In this case, it would load the JSON from a file
        JSONArray purchasedRecords = new JSONArray();
        try (BufferedReader reader = new BufferedReader(new FileReader("purchased.json"))) {
            String line;
            StringBuilder json = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                json.append(line);
            }
            purchasedRecords = new JSONArray(json.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return purchasedRecords;
    }

    // Save all purchased records to purchased_records.json
    private void savePurchasedRecords(JSONArray purchasedRecords, HttpServletRequest req) {
        String filePath = getPurchasedRecordFilePath(req);
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filePath), "UTF-8"))) {
            writer.write(purchasedRecords.toString());
        } catch (IOException e) {
            System.err.println("Error saving purchased records:");
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8"); // Ensure request encoding is UTF-8
        response.setContentType("application/json; charset=UTF-8"); // Set response content type
        response.setCharacterEncoding("UTF-8"); // Ensure response encoding is UTF-8

        BufferedReader reader = request.getReader();
        StringBuilder jsonContent = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            jsonContent.append(line);
        }

        JSONObject jsonRequest = new JSONObject(jsonContent.toString());

        // Extract the necessary data
        int userID = jsonRequest.getInt("userID");
        int itemID = jsonRequest.getInt("itemID");
        String itemTitle = jsonRequest.getString("itemTitle");
        String image = jsonRequest.getString("image");
        double price = jsonRequest.getDouble("price");
        int purchaseUnit = jsonRequest.getInt("purchaseUnit");
        double totalPrice = price * purchaseUnit;

        // Create the new purchased record object
        JSONObject newPurchasedRecord = new JSONObject();
        newPurchasedRecord.put("userID", userID);
        newPurchasedRecord.put("itemID", itemID);
        newPurchasedRecord.put("itemTitle", itemTitle);
        newPurchasedRecord.put("image", image);
        newPurchasedRecord.put("price", price);
        newPurchasedRecord.put("purchaseUnit", purchaseUnit);
        newPurchasedRecord.put("totalPrice", totalPrice);

        // Load existing purchased records
        JSONArray purchasedRecords = loadAllPurchasedRecords(request);

        // Add the new purchased record to the list
        purchasedRecords.put(newPurchasedRecord);

        // Save updated purchased records to the file
        savePurchasedRecords(purchasedRecords, request);

        // Respond with a success message
        response.getWriter().write("{\"message\": \"Purchased record added successfully!\"}");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        // Get userID from the request parameter
        String userIDParam = request.getParameter("userID");

        if (userIDParam == null) {
            response.getWriter().write("{\"error\": \"userID parameter is required\"}");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        int userID = Integer.parseInt(userIDParam);

        // Load all purchased records from purchased_records.json
        JSONArray purchasedRecords = loadAllPurchasedRecords(request);

        // Create a new array to hold records for the specific userID
        JSONArray userPurchasedRecords = new JSONArray();

        // Filter the records based on userID
        for (int i = 0; i < purchasedRecords.length(); i++) {
            JSONObject record = purchasedRecords.getJSONObject(i);
            if (record.getInt("userID") == userID) {
                userPurchasedRecords.put(record);
            }
        }

        // Send the filtered purchasedRecords as a JSON response
        response.getWriter().write(userPurchasedRecords.toString());
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private String getPurchasedRecordFilePath(HttpServletRequest req) {
        return getServletContext().getRealPath(PURCHASED_RECORD_FILE);
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with the actual origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Add CORS headers to all responses
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with the actual origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        // Continue with the original method
        super.service(request, response);
    }
}
