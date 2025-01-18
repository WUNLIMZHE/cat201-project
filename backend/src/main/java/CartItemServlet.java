import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import org.json.JSONArray;
import org.json.JSONObject;

import com.sunnypapyrus.models.CartItem;

import javax.servlet.annotation.WebServlet;
@WebServlet("/cart")
public class CartItemServlet extends HttpServlet {
    @SuppressWarnings("unused")
    private static boolean isLoadFromCart = false;
    private static int nextCartID;
    private static final String CART_FILE = "/data/cart.json"; // File path under webapp/data
    private static final String BOOKS_FILE = "/data/books.json"; // File path under webapp/data

    // Default constructor (no parameters)
    public CartItemServlet() {
        // This constructor is required for the servlet container to instantiate the servlet
    }

    // Load all cart items from cart.json
    private JSONArray loadAllCartItems(HttpServletRequest req) {
        JSONArray cartItems = new JSONArray();
        try {
            String filePath = getCartFilePath(req);
            File file = new File(filePath);
            if (file.exists()) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "UTF-8"));
                StringBuilder jsonContent = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    jsonContent.append(line);
                }
                reader.close();
                cartItems = new JSONArray(jsonContent.toString());
            }
        } catch (IOException e) {
            System.err.println("Error loading cart items:");
            e.printStackTrace();
        }
        return cartItems;
    }

    // Save all cart items to cart.json
    private void saveCartItems(JSONArray cartItems, HttpServletRequest req) {
        String filePath = getCartFilePath(req);
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filePath), "UTF-8"))) {
            writer.write(cartItems.toString());
        } catch (IOException e) {
            System.err.println("Error saving cart items:");
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set character encoding and content type
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        // Ensure `nextCartID` is properly initialized
        if (nextCartID < 1) {
            loadNextCartID(request);
        }

        // Read and parse the JSON request body
        StringBuilder jsonContent = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonContent.append(line);
            }
        }
        JSONObject jsonRequest = new JSONObject(jsonContent.toString());

        // Extract fields from the JSON request
        int userID = jsonRequest.getInt("userID");
        int id = jsonRequest.getInt("id");
        String title = jsonRequest.getString("title");
        String image = jsonRequest.getString("image");
        String genre = jsonRequest.getString("genre");
        String category = jsonRequest.getString("category");
        double price = jsonRequest.getDouble("price");
        int purchaseUnit = jsonRequest.getInt("purchaseUnit");
        int stock = jsonRequest.getInt("stock");
        String language = jsonRequest.getString("language");

        double totalPrice = price * purchaseUnit;

        // Log book title for debugging
        System.out.println("Book title: " + title);

        // Load existing cart items
        JSONArray cartItems = loadAllCartItems(request);

        // Check if the book with the same ID already exists in the cart
        boolean bookExists = false;
        for (int i = 0; i < cartItems.length(); i++) {
            JSONObject existingCartItem = cartItems.getJSONObject(i);
            if (existingCartItem.getInt("id") == id) {
                // Calculate the new purchase unit
                int existingPurchaseUnit = existingCartItem.getInt("purchaseUnit");
                int newPurchaseUnit = existingPurchaseUnit + 1;

                // Check if the new purchase unit exceeds the stock
                if (newPurchaseUnit > stock) {
                    // Respond with an error message
                    JSONObject errorResponse = new JSONObject();
                    errorResponse.put("message", "Insufficient stock. Unable to add more items to the cart.");
                    response.getWriter().write(errorResponse.toString());
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    return; // Exit the method early
                }

                // Update purchaseUnit and totalPrice of the existing item
                existingCartItem.put("purchaseUnit", newPurchaseUnit);
                existingCartItem.put("totalPrice", price * newPurchaseUnit);
                bookExists = true;
                break;
            }
        }

        if (!bookExists) {
            // Create and populate the new CartItem object
            CartItem newCartItem = new CartItem();
            newCartItem.setCartID(nextCartID++);
            newCartItem.setUserID(userID);
            newCartItem.setId(id);
            newCartItem.setTitle(title);
            newCartItem.setImage(image);
            newCartItem.setGenre(genre);
            newCartItem.setCategory(category);
            newCartItem.setPrice(price);
            newCartItem.setPurchaseUnit(purchaseUnit);
            newCartItem.setTotalPrice(totalPrice);
            newCartItem.setStock(stock);
            newCartItem.setLanguage(language);

            // Convert the new cart item to JSON and add it to the array
            JSONObject newCartItemJson = new JSONObject();
            newCartItemJson.put("cartID", newCartItem.getCartID());
            newCartItemJson.put("userID", newCartItem.getUserID());
            newCartItemJson.put("id", newCartItem.getId());
            newCartItemJson.put("title", newCartItem.getTitle());
            newCartItemJson.put("image", newCartItem.getImage());
            newCartItemJson.put("genre", newCartItem.getGenre());
            newCartItemJson.put("category", newCartItem.getCategory());
            newCartItemJson.put("price", newCartItem.getPrice());
            newCartItemJson.put("purchaseUnit", newCartItem.getPurchaseUnit());
            newCartItemJson.put("totalPrice", newCartItem.getTotalPrice());
            newCartItemJson.put("stock", newCartItem.getStock());
            newCartItemJson.put("language", newCartItem.getLanguage());

            cartItems.put(newCartItemJson);
        }

        // Save the updated cart items
        saveCartItems(cartItems, request);

        // Respond with success message
        JSONObject responseJson = new JSONObject();
        responseJson.put("message", "Cart item added successfully!");
        response.getWriter().write(responseJson.toString());
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        // Load all cart items from cart.json
        JSONArray cartItems = loadAllCartItems(request);

        // Send the cartItems as a JSON response
        response.getWriter().write(cartItems.toString());
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        BufferedReader reader = request.getReader();
        StringBuilder jsonContent = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            jsonContent.append(line);
        }
        System.out.println("Received PUT Request: " + jsonContent.toString());

        JSONObject jsonRequest = new JSONObject(jsonContent.toString());
        int cartID = jsonRequest.getInt("cartID");

        JSONArray cartItems = loadAllCartItems(request);

        boolean itemUpdated = false;
        for (int i = 0; i < cartItems.length(); i++) {
            JSONObject item = cartItems.getJSONObject(i);
            if (item.getInt("cartID") == cartID) {
                // Update fields
                if (jsonRequest.has("purchaseUnit")) {
                    item.put("purchaseUnit", jsonRequest.getInt("purchaseUnit"));
                    item.put("totalPrice", item.getDouble("price") * jsonRequest.getInt("purchaseUnit"));
                }
                if (jsonRequest.has("stock")) {
                    item.put("stock", jsonRequest.getInt("stock"));
                }
                itemUpdated = true;
                break;
            }
        }

        if (itemUpdated) {
            saveCartItems(cartItems, request);
            response.getWriter().write("{\"message\": \"Cart item updated successfully!\"}");
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            response.getWriter().write("{\"error\": \"Cart item not found!\"}");
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

@Override
protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("application/json; charset=UTF-8");
    response.setCharacterEncoding("UTF-8");

    BufferedReader reader = request.getReader();
    StringBuilder jsonContent = new StringBuilder();
    String line;
    while ((line = reader.readLine()) != null) {
        jsonContent.append(line);
    }

    System.out.println("Received DELETE Request: " + jsonContent.toString());

    // Parse the JSON request
    JSONObject jsonRequest = new JSONObject(jsonContent.toString());
    JSONArray cartItems = loadAllCartItems(request);

    boolean itemDeleted = false;

    if (jsonRequest.has("cartID")) {
        // Scenario 1: Delete a single book by ID
        int cartID = jsonRequest.getInt("cartID");
        for (int i = 0; i < cartItems.length(); i++) {
            JSONObject item = cartItems.getJSONObject(i);
            if (item.getInt("cartID") == cartID) {
                cartItems.remove(i);
                itemDeleted = true;
                break;
            }
        }
    } else if (jsonRequest.has("cartIDs")) {
        // Scenario 2: Delete multiple books by IDs
        JSONArray cartIDs = jsonRequest.getJSONArray("cartIDs");
        for (int i = 0; i < cartIDs.length(); i++) {
            int cartID = cartIDs.getInt(i);
            for (int j = 0; j < cartItems.length(); j++) {
                JSONObject item = cartItems.getJSONObject(j);
                if (item.getInt("cartID") == cartID) {
                    cartItems.remove(j);
                    itemDeleted = true;
                    break; // Remove and move to the next cartID
                }
            }
        }
    } else {
        response.getWriter().write("{\"error\": \"Invalid request format! Provide 'cartID' or 'cartIDs'.\"}");
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return;
    }

    if (itemDeleted) {
        saveCartItems(cartItems, request);
        response.getWriter().write("{\"message\": \"Cart item(s) deleted successfully!\"}");
        response.setStatus(HttpServletResponse.SC_OK);
    } else {
        response.getWriter().write("{\"error\": \"Cart item(s) not found!\"}");
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }
}

    private void loadNextCartID(HttpServletRequest req) {
        JSONArray cartItems = loadAllCartItems(req);
        if (cartItems.length() > 0) {
            JSONObject lastItem = cartItems.getJSONObject(cartItems.length() - 1);
            nextCartID = lastItem.getInt("cartID") + 1;
        } else {
            nextCartID = 1;
        }
    }

    private String getCartFilePath(HttpServletRequest req) {
        return getServletContext().getRealPath(CART_FILE);
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
