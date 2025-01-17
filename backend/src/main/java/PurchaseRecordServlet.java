import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;

import java.net.URL;
import java.io.OutputStream;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;

@WebServlet("/purchase-record")
public class PurchaseRecordServlet extends HttpServlet {
    private static int nextPurchaseID;
    private static final String PURCHASED_RECORD_FILE = "/data/purchase.json"; // File path for purchased records

    // Default constructor (no parameters)
    public PurchaseRecordServlet() {
        // This constructor is required for the servlet container to instantiate the servlet
    }

    private void loadNextPurchaseID(HttpServletRequest req) {
        JSONArray cartItems = loadAllpurchaseRecord(req);
        if (cartItems.length() > 0) {
            JSONObject lastItem = cartItems.getJSONObject(cartItems.length() - 1);
            nextPurchaseID = lastItem.getInt("purchaseID") + 1;
        } else {
            nextPurchaseID = 1;
        }
    }

    // Load all purchased records from purchased_records.json
    private JSONArray loadAllpurchaseRecord(HttpServletRequest request) {
        JSONArray purchaseHistory = new JSONArray();
        try {
            String filePath = getPurchaseRecordFilePath(request);
            File file = new File(filePath);
            if (file.exists()) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "UTF-8"));
                StringBuilder jsonContent = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    jsonContent.append(line);
                }
                reader.close();
                purchaseHistory = new JSONArray(jsonContent.toString());
                System.out.println(purchaseHistory);
            }
        } catch (IOException e) {
            System.err.println("Error loading cart items:");
            e.printStackTrace();
        }
        return purchaseHistory;
    }

    // Save all purchased records to purchased_records.json
    private void savepurchaseRecord(JSONArray purchaseRecord, HttpServletRequest req) {
        String filePath = getPurchaseRecordFilePath(req);
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filePath), "UTF-8"))) {
            writer.write(purchaseRecord.toString());
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

         // Parse the incoming data as a JSONObject
        JSONObject jsonRequest = new JSONObject(jsonContent.toString());

        // Extract userID and cart from the request
        int userID = jsonRequest.getInt("userID");
        JSONArray cartItems = jsonRequest.getJSONArray("cart");

        // Ensure `nextCartID` is properly initialized
        if (nextPurchaseID < 1) {
            loadNextPurchaseID(request);
        }
        System.out.println("Next purchase ID" + nextPurchaseID);

        //create a new purchase record
        PurchaseRecord newPurchasedRecord = new PurchaseRecord(nextPurchaseID, userID, 0, "TESTING ADDRESS");

        double totalAmount = 0;
        JSONArray deletedCartIDs = new JSONArray();

        // Process each cart item
        for (int i = 0; i < cartItems.length(); i++) {
            JSONObject cartItem = cartItems.getJSONObject(i);

            // Extract necessary data for each cart item
            int cartID = cartItem.getInt("cartID");
            int itemID = cartItem.getInt("id");
            String title = cartItem.getString("title");
            String image = cartItem.getString("image");
            String category = cartItem.getString("category");
            String genre = cartItem.getString("genre");
            String language = cartItem.getString("language");
            double price = cartItem.getDouble("price");
            int purchaseUnit = cartItem.getInt("purchaseUnit");
            double totalPrice = cartItem.getDouble("totalPrice");
            totalAmount += totalPrice; // update the total ammount of a single purchase
            int stock = cartItem.getInt("stock");

            // Process the extracted data (e.g., add to cart, save to the database, etc.)
            System.out.println("Processing cart item: " + title + ", Price: " + price + ", Total Price: " + totalPrice);

            // Check if the requested purchase unit exceeds available stock
            if (purchaseUnit > stock) {
                // Send an error message if stock is insufficient
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
                response.getWriter().write("{\"message\": \"Sorry, insufficient stock for item: " + title + "\"}");
                return; // Exit after sending the error response
            }

            // Send DELETE request for the cart item
            if (sendDeleteRequest(cartID)) {
                deletedCartIDs.put(cartID);
            }

            //Create CartItem object to be stored in books list
            CartItem book = new CartItem(cartID, userID, itemID, title, image, genre, category, price, purchaseUnit, totalPrice, stock, language);

            newPurchasedRecord.addBook(book); //add new book to the books ArrayList
        }

        newPurchasedRecord.setTotalAmount(totalAmount); // set the total ammount of a single purchase

        // Convert newPurchasedRecord to JSONObject
        JSONObject purchaseRecordJson = new JSONObject();
        purchaseRecordJson.put("purchaseID", newPurchasedRecord.getPurchaseID());
        purchaseRecordJson.put("userID", newPurchasedRecord.getUserID());
        purchaseRecordJson.put("totalAmount", newPurchasedRecord.getTotalAmount());
        purchaseRecordJson.put("shippingAddress", newPurchasedRecord.getShippingAddress());

        // Create an array for books
        JSONArray booksArray = new JSONArray();
        for (CartItem book : newPurchasedRecord.getBooks()) {
            JSONObject bookJson = new JSONObject();
            bookJson.put("id", book.getId());
            bookJson.put("title", book.getTitle());
            bookJson.put("image", book.getImage());
            bookJson.put("price", book.getPrice());
            bookJson.put("purchaseUnit", book.getPurchaseUnit());
            bookJson.put("totalPrice", book.getTotalPrice());
            booksArray.put(bookJson);
        }

        purchaseRecordJson.put("books", booksArray);

        // Write the JSONObject to the purchase.json file
        // File purchaseFile = new File("purchase.json");
        // FileWriter fileWriter = new FileWriter(purchaseFile, true); // Open in append mode
        // try (Writer writer = fileWriter) {
        //     writer.write(purchaseRecordJson.toString());
        //     writer.write("\n"); // Optionally add a newline between records
        // }

        // Load existing purchased records
        JSONArray purchaseRecord = loadAllpurchaseRecord(request);

        // Convert the new cart item to JSON and add it to the array
        JSONObject newPurchasedRecordJson = new JSONObject();
        newPurchasedRecordJson.put("purchaseID", newPurchasedRecord.getPurchaseID());
        newPurchasedRecordJson.put("userID", newPurchasedRecord.getUserID());
        newPurchasedRecordJson.put("totalAmmount", newPurchasedRecord.getTotalAmount());
        newPurchasedRecordJson.put("shippingAddress", newPurchasedRecord.getShippingAddress());
        newPurchasedRecordJson.put("books", newPurchasedRecord.getBooks());

        // Add the new purchased record to the list
        purchaseRecord.put(newPurchasedRecordJson);

        // Save updated purchased records to the file
        savepurchaseRecord(purchaseRecord, request);

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
        JSONArray purchaseRecord = loadAllpurchaseRecord(request);

        // Create a new array to hold records for the specific userID
        JSONArray userpurchaseRecord = new JSONArray();

        // Filter the records based on userID
        for (int i = 0; i < purchaseRecord.length(); i++) {
            JSONObject record = purchaseRecord.getJSONObject(i);
            if (record.getInt("userID") == userID) {
                userpurchaseRecord.put(record);
            }
        }

        // Send the filtered purchaseRecord as a JSON response
        response.getWriter().write(userpurchaseRecord.toString());
        response.setStatus(HttpServletResponse.SC_OK);
    }

    /**
     * Sends a DELETE request to the backend to delete a cart item by cartID.
     *
     * @param cartID The ID of the cart item to delete.
     * @return True if the deletion was successful, otherwise false.
     */
    private boolean sendDeleteRequest(int cartID) {
        try {
            URL url = new URL("http://localhost:9000/cart"); // Replace with actual backend endpoint
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("DELETE");
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            connection.setRequestProperty("Accept", "application/json; charset=UTF-8");

            // Send JSON payload with cartID
            connection.setDoOutput(true);
            JSONObject payload = new JSONObject();
            payload.put("cartID", cartID);

            try (OutputStream os = connection.getOutputStream()) {
                os.write(payload.toString().getBytes(StandardCharsets.UTF_8));
                os.flush();
            }

            // Check the response code
            int responseCode = connection.getResponseCode();
            return responseCode == HttpServletResponse.SC_OK;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private String getPurchaseRecordFilePath(HttpServletRequest req) {
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
