import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
@WebServlet("/cart")
public class CartItemServlet extends HttpServlet {
    private static boolean isLoadFromCart = false;
    private static int nextCartID;
    private static final String CART_FILE = "/data/cart.json"; // File path under webapp/data
    private static final String BOOKS_FILE = "/data/books.json"; // File path under webapp/data

    private int cartID;
    private int userID;
    private int id; // Book ID
    private String title;
    private String image;
    private String genre;
    private String category;
    private double price;
    private int purchaseUnit;
    private double totalPrice;
    private int stock;
    private String language;

    // Default constructor (no parameters)
    public CartItemServlet() {
        // This constructor is required for the servlet container to instantiate the servlet
    }

    // Getters and Setters
    public int getCartID() {
        return cartID;
    }

    public void setCartID(int cartID) {
        this.cartID = cartID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getPurchaseUnit() {
        return purchaseUnit;
    }

    public void setPurchaseUnit(int purchaseUnit) {
        this.purchaseUnit = purchaseUnit;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    // toString() Method for Debugging and Display
    @Override
    public String toString() {
        return "CartItem{" +
                "cartID=" + cartID +
                ", userID=" + userID +
                ", id=" + id +
                ", title='" + title + '\'' +
                ", image='" + image + '\'' +
                ", genre='" + genre + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", purchaseUnit=" + purchaseUnit +
                ", totalPrice=" + totalPrice +
                ", stock=" + stock +
                ", language='" + language + '\'' +
                '}';
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

        CartItemServlet newCartItem = new CartItemServlet();
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

}
