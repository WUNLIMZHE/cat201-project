package com.sunnypapyrus.models;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.io.FileWriter;
import java.io.IOException;
import java.io.FileReader;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;

public class PurchaseRecord {
    private UserList userList;
    private UserEntity user;
    private int purchaseID;
    private int userID;
    private String username;
    private String phone;

    /**
     * 1. Pending
     * 2. Confirmed
     * 3. Processing
     * 4. Shipped
     * 5. Out for Delivery
     * 6. Delivered
     * 7. Cancelled/Failed
     * 8. Returned/Refunded
     */
    private String purchaseStatus = "Pending";
    private double totalAmount;
    private String shippingAddress;
    private String date;
    private List<CartItem> books; // Using CartItem to store purchased books
    private LocalDateTime purchaseDate; // Store the purchase date and time

    // Constructor

    public PurchaseRecord() {
        this.books = new ArrayList<>();
    }

    public PurchaseRecord(int purchaseID, int userID, double totalAmount, String shippingAddress, List<CartItem> books,
            LocalDateTime purchaseDate) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.books = books;
        this.purchaseDate = purchaseDate;
    }

    public PurchaseRecord(int purchaseID, int userID, double totalAmount,
            String shippingAddress, LocalDateTime purchaseDate, String purchaseStatus, List<CartItem> books) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.purchaseStatus = purchaseStatus;
        this.purchaseDate = purchaseDate;
        this.books = books;
        // this.paymentMethod = paymentMethod;
        this.user = new UserEntity(); // Initialize user object
        this.username = user.getUsernameByID(String.valueOf(userID));
        this.phone = user.getUserPhoneByID(String.valueOf(userID));
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDate() {
        return date;
    }

    public PurchaseRecord(int purchaseID, int userID, double totalAmount,
            String shippingAddress) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.purchaseStatus = "Pending";
        this.books = new ArrayList<CartItem>(); // Instantiate with ArrayList
    }

    public PurchaseRecord(int purchaseID, int userID, double totalAmount, String shippingAddress,
            LocalDateTime purchaseDate) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.books = new ArrayList<CartItem>(); // Instantiate with ArrayList
        this.purchaseDate = purchaseDate;
    }

    public void addBook(CartItem book) {
        books.add(book);
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    // Get formatted purchase date
    public String getFormattedPurchaseDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a");
        return purchaseDate.format(formatter);
    }

    public void editCart(int purchaseID, int bookID, int quantity) {
        List<PurchaseRecord> purchaseRecords = loadPurchaseRecords();
        boolean updated = false;
        double newtotalAmount = 0;
        for (PurchaseRecord purchaseRecord : purchaseRecords) {
            if (purchaseRecord.getPurchaseID() == purchaseID) {
                for (CartItem book : purchaseRecord.getBooks()) {
                    if (book.getId() == bookID) {
                        book.setPurchaseUnit(quantity);
                        book.setTotalPrice(book.getPrice() * quantity);
                        updated = true;
                        break;
                    }
                }
                break;
            }
        }
        for (PurchaseRecord purchaseRecord : purchaseRecords) {
            if (purchaseRecord.getPurchaseID() == purchaseID) {
                for (CartItem book : purchaseRecord.getBooks()) {
                    newtotalAmount += book.getTotalPrice();
                }
                purchaseRecord.setTotalAmount(newtotalAmount);
                break;
            }
        }
        setTotalAmount(newtotalAmount);
        if (!updated) {
            throw new IllegalArgumentException("Purchase ID or Book ID not found");
        }
        savePurchaseRecords(purchaseRecords);
    }

    public void setPurchaseByID(int purchaseID) {
        List<PurchaseRecord> purchaseRecords = loadPurchaseRecords();
        for (PurchaseRecord purchaseRecord : purchaseRecords) {
            if (purchaseRecord.getPurchaseID() == purchaseID) {
                this.purchaseID = purchaseRecord.getPurchaseID();
                this.userID = purchaseRecord.getUserID();
                this.totalAmount = purchaseRecord.getTotalAmount();
                this.shippingAddress = purchaseRecord.getShippingAddress();
                this.purchaseStatus = purchaseRecord.getPurchaseStatus();
                this.books = purchaseRecord.getBooks();
                // this.paymentMethod = purchaseRecord.getPaymentMethod();
                this.user = purchaseRecord.getUser();
                this.username = purchaseRecord.getUsername();
                this.phone = purchaseRecord.getPhone();
                break;
            }
        }
    }

    public void updatePurchaseStatus(int purchaseID, String purchaseStatus) {
        List<PurchaseRecord> purchaseRecords = loadPurchaseRecords();
        boolean updated = false;
        for (PurchaseRecord purchaseRecord : purchaseRecords) {
            if (purchaseRecord.getPurchaseID() == purchaseID) {
                purchaseRecord.setPurchaseStatus(purchaseStatus);
                updated = true;
                break;
            }
        }
        if (!updated) {
            throw new IllegalArgumentException("Purchase ID not found");
        }
        savePurchaseRecords(purchaseRecords);
    }

    public void editTotalAmount(int purchaseID, double totalAmount) {
        List<PurchaseRecord> purchaseRecords = loadPurchaseRecords();
        boolean updated = false;
        for (PurchaseRecord purchaseRecord : purchaseRecords) {
            if (purchaseRecord.getPurchaseID() == purchaseID) {
                purchaseRecord.setTotalAmount(totalAmount);
                updated = true;
                break;
            }
        }
        if (!updated) {
            throw new IllegalArgumentException("Purchase ID not found");
        }
        savePurchaseRecords(purchaseRecords);
    }

    // Getters and Setters
    public int getPurchaseID() {
        return purchaseID;
    }

    public void setPurchaseID(int purchaseID) {
        this.purchaseID = purchaseID;
    }

    public String setUsername(String username) {
        return this.username = username;
    }

    public String setPhone(String phone) {
        return this.phone = phone;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setPurchaseStatus(String purchaseStatus) {
        this.purchaseStatus = purchaseStatus;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public void setBooks(List<CartItem> books) {
        this.books = books;
    }

    public int getUserID() {
        return userID;
    }

    public String getUsername() {
        return username;
    }

    public String getPhone() {
        return phone;
    }

    public String getPurchaseStatus() {
        return purchaseStatus;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public List<CartItem> getBooks() {
        return books;
    }

    public UserList getUserList() {
        return userList;
    }

    public UserEntity getUser() {
        return user;
    }

    // Method to display purchase record details
    public void displayPurchaseRecord() {
        System.out.println("Purchase ID: " + purchaseID);
        System.out.println("User ID: " + userID);
        System.out.println("Purchase Status: " + purchaseStatus);
        System.out.println("Total Amount: $" + totalAmount);
        System.out.println("Shipping Address: " + shippingAddress);
        System.out.println("Books Purchased:");
        for (CartItem book : books) {
            System.out.println(" - Cart ID: " + book.getCartID());
            System.out.println(" User ID: " + book.getUserID());
            System.out.println(" Book ID: " + book.getId());
            System.out.println(" Title: " + book.getTitle());
            System.out.println(" Image: " + book.getImage());
            System.out.println(" Genre: " + book.getGenre());
            System.out.println(" Category: " + book.getCategory());
            System.out.println(" Price: $" + book.getPrice());
            System.out.println(" Units Purchased: " + book.getPurchaseUnit());
            System.out.println(" Total Price: $" + book.getTotalPrice());
            System.out.println(" Stock: " + book.getStock());
            System.out.println(" Language: " + book.getLanguage());
        }
    }

    public static List<PurchaseRecord> loadPurchaseRecords() {
        List<PurchaseRecord> purchaseRecords = new ArrayList<>();
        JSONParser jsonParser = new JSONParser();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a");

        try (FileReader reader = new FileReader("src/main/webapp/data/purchase.json")) {
            Object obj = jsonParser.parse(reader);
            if (obj == null) {
                System.out.println("File is empty!!");
                return purchaseRecords; // Return empty list if file is empty
            }
            JSONArray purchaseList = (JSONArray) obj;

            for (Object purchaseObj : purchaseList) {
                JSONObject purchaseJSON = (JSONObject) purchaseObj;
            
                // Debugging logs
                System.out.println("Processing Purchase Object: " + purchaseJSON);
            
                // Debugging for each field
                System.out.println("Purchase ID: " + purchaseJSON.get("purchaseID"));
                System.out.println("User ID: " + purchaseJSON.get("userID"));
                System.out.println("Total Ammount: " + purchaseJSON.get("totalAmmount"));
                System.out.println("Shipping Address: " + purchaseJSON.get("shippingAddress"));
                System.out.println("Purchase Status: " + purchaseJSON.get("purchaseStatus"));
                System.out.println("Purchase Date: " + purchaseJSON.get("purchaseDate"));
                System.out.println("Books: " + purchaseJSON.get("books"));
            
                int purchaseID = ((Long) purchaseJSON.get("purchaseID")).intValue();
                int userID = ((Long) purchaseJSON.get("userID")).intValue();
                double totalAmount = ((Number) purchaseJSON.get("totalAmmount")).doubleValue();
                String shippingAddress = (String) purchaseJSON.get("shippingAddress");
                String purchaseStatus = (String) purchaseJSON.get("purchaseStatus");
                String purchaseDateStr = (String) purchaseJSON.get("purchaseDate");
                LocalDateTime purchaseDate = purchaseDateStr != null ? LocalDateTime.parse(purchaseDateStr, formatter) : null;
                JSONArray booksJSON = (JSONArray) purchaseJSON.get("books");
            
                List<CartItem> books = new ArrayList<>();
                for (Object bookObj : booksJSON) {
                    JSONObject bookJSON = (JSONObject) bookObj;
            
                    // Debugging for each book field
                    System.out.println("Processing Book Object: " + bookJSON);
                    System.out.println("Book ID: " + bookJSON.get("id"));
                    System.out.println("Title: " + bookJSON.get("title"));
                    System.out.println("Image: " + bookJSON.get("image"));
                    System.out.println("Price: " + bookJSON.get("price"));
                    System.out.println("Purchase Unit: " + bookJSON.get("purchaseUnit"));
                    System.out.println("Total Price: " + bookJSON.get("totalPrice"));
                    System.out.println("Cart ID: " + bookJSON.get("cartID"));
                    System.out.println("Genre: " + bookJSON.get("genre"));
                    System.out.println("Category: " + bookJSON.get("category"));
                    System.out.println("Language: " + bookJSON.get("language"));
                    System.out.println("Stock: " + bookJSON.get("stock"));
                    System.out.println("Book User ID: " + bookJSON.get("userID"));
            
                    int id = ((Long) bookJSON.get("id")).intValue();
                    String title = (String) bookJSON.get("title");
                    String image = (String) bookJSON.get("image");
                    double price = ((Number) bookJSON.get("price")).doubleValue();
                    int purchaseUnit = ((Long) bookJSON.get("purchaseUnit")).intValue();
                    double totalPrice = ((Number) bookJSON.get("totalPrice")).doubleValue();
                    int cartID = ((Long) bookJSON.get("cartID")).intValue();
                    String genre = (String) bookJSON.get("genre");
                    String category = (String) bookJSON.get("category");
                    String language = (String) bookJSON.get("language");
                    int stock = ((Long) bookJSON.get("stock")).intValue();
                    int bookUserID = ((Long) bookJSON.get("userID")).intValue();
            
                    CartItem book = new CartItem(id, purchaseUnit);
                    book.setTitle(title);
                    book.setImage(image);
                    book.setGenre(genre);
                    book.setCategory(category);
                    book.setPrice(price);
                    book.setUserID(bookUserID);
                    book.setCartID(cartID);
                    book.setTotalPrice(totalPrice);
                    book.setStock(stock);
                    book.setLanguage(language);
                    books.add(book);
                }
            
                PurchaseRecord purchaseRecord = new PurchaseRecord(purchaseID, userID, totalAmount, shippingAddress, purchaseDate, purchaseStatus, books);
                purchaseRecords.add(purchaseRecord);
            }
            
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        return purchaseRecords;
    }

    public static void savePurchaseRecords(List<PurchaseRecord> purchaseRecords) {
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(PurchaseRecord.class, new PurchaseRecordSerializer())
                .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer())
                .setPrettyPrinting()
                .create();
        try (FileWriter file = new FileWriter("src/main/webapp/data/purchase.json")) {
            String json = gson.toJson(purchaseRecords);
            file.write(json);
            file.flush(); // Ensure all data is written to the file
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static class PurchaseRecordSerializer implements JsonSerializer<PurchaseRecord> {
        @Override
        public JsonElement serialize(PurchaseRecord purchaseRecord, Type typeOfSrc, JsonSerializationContext context) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.add("books", context.serialize(purchaseRecord.getBooks()));
            jsonObject.addProperty("purchaseID", purchaseRecord.getPurchaseID());
            jsonObject.addProperty("shippingAddress", purchaseRecord.getShippingAddress());
            jsonObject.addProperty("userID", purchaseRecord.getUserID());
            jsonObject.addProperty("totalAmount", purchaseRecord.getTotalAmount());
            jsonObject.addProperty("purchaseStatus", purchaseRecord.getPurchaseStatus());
            jsonObject.addProperty("purchaseDate",
                    purchaseRecord.getPurchaseDate() != null
                            ? purchaseRecord.getPurchaseDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a"))
                            : null);
            return jsonObject;
        }
    }

    private static class LocalDateTimeSerializer implements JsonSerializer<LocalDateTime> {
        @Override
        public JsonElement serialize(LocalDateTime localDateTime, Type typeOfSrc, JsonSerializationContext context) {
            return context.serialize(localDateTime.format(DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a")));
        }
    }
}
