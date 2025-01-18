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
            String shippingAddress, String purchaseStatus, List<CartItem> books) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.purchaseStatus = purchaseStatus;
        this.books = books;
        // this.paymentMethod = paymentMethod;
        this.user = new UserEntity(); // Initialize user object
        this.username = user.getUsernameByID(String.valueOf(userID));
        this.phone = user.getUserPhoneByID(String.valueOf(userID));
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

        try (FileReader reader = new FileReader("d:/CAT Project/Paperme/backend/src/main/webapp/data/purchase.json")) {
            Object obj = jsonParser.parse(reader);
            JSONArray purchaseList = (JSONArray) obj;

            for (Object purchaseObj : purchaseList) {
                JSONObject purchaseJSON = (JSONObject) purchaseObj;
                int purchaseID = ((Long) purchaseJSON.get("purchaseID")).intValue();
                int userID = ((Long) purchaseJSON.get("userID")).intValue();
                double totalAmount = ((Number) purchaseJSON.get("totalAmount")).doubleValue();
                String shippingAddress = (String) purchaseJSON.get("shippingAddress");
                String purchaseStatus = (String) purchaseJSON.get("purchaseStatus");
                String username = (String) purchaseJSON.get("username");
                String phone = (String) purchaseJSON.get("phone");

                JSONArray booksJSON = (JSONArray) purchaseJSON.get("books");
                List<CartItem> books = new ArrayList<>();
                for (Object bookObj : booksJSON) {
                    JSONObject bookJSON = (JSONObject) bookObj;
                    int id = ((Long) bookJSON.get("id")).intValue();
                    String title = (String) bookJSON.get("title");
                    String image = (String) bookJSON.get("image");
                    double price = ((Number) bookJSON.get("price")).doubleValue();
                    int purchaseUnit = ((Long) bookJSON.get("purchaseUnit")).intValue();
                    double totalPrice = ((Number) bookJSON.get("totalPrice")).doubleValue();

                    CartItem book = new CartItem(id, purchaseUnit);
                    book.setTitle(title);
                    book.setImage(image);
                    book.setPrice(price);
                    book.setTotalPrice(totalPrice);
                    books.add(book);
                }

                PurchaseRecord purchaseRecord = new PurchaseRecord(purchaseID, userID, totalAmount,
                        shippingAddress, purchaseStatus, books);
                purchaseRecord.setUsername(username);
                purchaseRecord.setPhone(phone);
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
                .setPrettyPrinting()
                .create();
        try (FileWriter file = new FileWriter("d:/CAT Project/Paperme/backend/src/main/webapp/data/purchase.json")) {
            file.write(gson.toJson(purchaseRecords));
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
            return jsonObject;
        }
    }
}
