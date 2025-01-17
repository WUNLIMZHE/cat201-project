import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import org.json.JSONArray;
import org.json.JSONObject;

import com.sunnypapyrus.models.CartItem;

import javax.servlet.annotation.WebServlet;
@WebServlet("/cart")
public class CartItemServlet extends HttpServlet {
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
        request.setCharacterEncoding("UTF-8"); // Ensure request encoding is UTF-8
        response.setContentType("application/json; charset=UTF-8"); // Set response content type
        response.setCharacterEncoding("UTF-8"); // Ensure response encoding is UTF-8

        if (nextCartID < 1) {
            loadNextCartID(request);
        }

        BufferedReader reader = request.getReader();
        StringBuilder jsonContent = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            jsonContent.append(line);
        }

        JSONObject jsonRequest = new JSONObject(jsonContent.toString());

        int userID = jsonRequest.getInt("userID");
        int id = jsonRequest.getInt("id");
        String title = jsonRequest.getString("title");
        String image = jsonRequest.getString("image");
        String genre = jsonRequest.getString("genre");
        String category = jsonRequest.getString("category");
        double price = jsonRequest.getDouble("price");
        int purchaseUnit = jsonRequest.getInt("purchaseUnit");
        double totalPrice = price * purchaseUnit;
        int stock = jsonRequest.getInt("stock");
        String language = jsonRequest.getString("language");

        System.out.println("Book title" + title);

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

        JSONArray cartItems = loadAllCartItems(request);

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

        saveCartItems(cartItems, request);

        response.getWriter().write("{\"message\": \"Cart item added successfully!\"}");
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

        // String cartIDParam = request.getParameter("cartID");
        // if (cartIDParam == null) {
        //     response.getWriter().write("{\"error\": \"Cart ID is required!\"}");
        //     response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        //     return;
        // }

        // int cartID = Integer.parseInt(cartIDParam);

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

        boolean itemDeleted = false;
        for (int i = 0; i < cartItems.length(); i++) {
            JSONObject item = cartItems.getJSONObject(i);
            if (item.getInt("cartID") == cartID) {
                cartItems.remove(i);
                itemDeleted = true;
                break;
            }
        }

        if (itemDeleted) {
            saveCartItems(cartItems, request);
            response.getWriter().write("{\"message\": \"Cart item deleted successfully!\"}");
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            response.getWriter().write("{\"error\": \"Cart item not found!\"}");
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
