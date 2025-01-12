import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray; // For JSON handling
import org.json.JSONObject;
import java.io.*;
import java.util.List;

@WebServlet("/add-cart")  // This maps servlet to the /add-cart URL
public class CartItemServlet extends HttpServlet {
    private static int nextCartID;
    private static final String CART_FILE = "/data/cart.json"; // File path under webapp/data

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

    // Method to load the nextCartID from the cart.json file
    private static void loadNextCartID() {
        try {
            File file = new File(CART_FILE);
            if (file.exists()) {
                BufferedReader reader = new BufferedReader(new FileReader(file));
                StringBuilder jsonContent = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    jsonContent.append(line);
                }
                reader.close();

                // Parse the JSON content
                JSONArray cartArray = new JSONArray(jsonContent.toString());
                if (cartArray.length() > 0) {
                    JSONObject lastItem = cartArray.getJSONObject(cartArray.length() - 1);
                    nextCartID = lastItem.getInt("cartID") + 1;  // Set nextCartID based on the last cartID
                } else {
                    nextCartID = 1;  // If the cart is empty, start from 1
                }
            } else {
                nextCartID = 1;  // If the file doesn't exist, start from 1
            }
        } catch (IOException e) {
            e.printStackTrace();
            nextCartID = 1;  // Default value if there's an issue reading the file
        }
    }

    // Method to save the cart items to cart.json
    private static void saveCartItems(JSONArray cartItems) {
        try {
            System.out.println("Saving the following cart items: " + cartItems.toString());
            BufferedWriter writer = new BufferedWriter(new FileWriter(CART_FILE));
            writer.write(cartItems.toString());
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }    

    // Handle POST request to add a new CartItem
    @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // Read the JSON data from the request body
    BufferedReader reader = request.getReader();
    StringBuilder jsonContent = new StringBuilder();
    String line;
    while ((line = reader.readLine()) != null) {
        jsonContent.append(line);
    }

    // Parse the JSON content
    JSONObject jsonRequest = new JSONObject(jsonContent.toString());

    // Extract the data from the JSON object
    int userID = jsonRequest.getInt("userID");
    int id = jsonRequest.getInt("id");
    String title = jsonRequest.getString("title");
    String image = jsonRequest.getString("image");
    String genre = jsonRequest.getString("genre");
    String category = jsonRequest.getString("category");
    double price = jsonRequest.getDouble("price");
    int purchaseUnit = jsonRequest.getInt("purchaseUnit");
    double totalPrice = price * purchaseUnit; // Calculate total price
    int stock = jsonRequest.getInt("stock");
    String language = jsonRequest.getString("language");

    // Create new CartItem
    CartItemServlet newCartItem = new CartItemServlet();
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

    // Load existing cart items from cart.json
    File file = new File(CART_FILE);
    JSONArray cartItems = new JSONArray();
    if (file.exists()) {
        BufferedReader fileReader = new BufferedReader(new FileReader(file));
        StringBuilder jsonFileContent = new StringBuilder();
        while ((line = fileReader.readLine()) != null) {
            jsonFileContent.append(line);
        }
        fileReader.close();
        cartItems = new JSONArray(jsonFileContent.toString());
    }

    // Add the new cart item to the array
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

    // Save the updated cart items to cart.json
    saveCartItems(cartItems);

    // Send a response to the client
    response.setContentType("application/json");
    response.getWriter().write("{\"message\": \"Cart item added successfully!\"}");
    response.setStatus(HttpServletResponse.SC_OK);
}


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Example response for GET request
        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"GET method is not supported. Use POST to add items.\"}");
    }

    // Initialize the servlet and load the nextCartID
    @Override
    public void init() throws ServletException {
        loadNextCartID();
    }
}

