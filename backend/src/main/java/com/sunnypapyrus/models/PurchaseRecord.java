package com.sunnypapyrus.models;

import java.util.ArrayList;
import java.util.List;

import java.io.FileWriter;
import java.io.IOException;
import java.io.FileReader;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import com.google.gson.Gson;

public class PurchaseRecord {
    private UserList userList;
    private UserEntity user;
    private int purchaseID;
    private int userID;

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
    private String purchaseStatus;
    private double totalAmount;
    private String shippingAddress;
    private String paymentMethod;
    private String username;
    private String phone;
    private List<CartItem> books; // Using CartItem to store purchased books


    public PurchaseRecord() {
        this.books = new ArrayList<>();
    }

    // Constructor
    public PurchaseRecord(int purchaseID, int userID, double totalAmount,
            String shippingAddress, String paymentMethod, String purchaseStatus, List<CartItem> books) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.purchaseStatus = purchaseStatus;
        this.books = books;
        this.paymentMethod = paymentMethod;
        this.user = new UserEntity(); // Initialize user object
        this.username = user.getUsernameByID(String.valueOf(userID));
        this.phone = user.getUserPhoneByID(String.valueOf(userID));
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
                this.paymentMethod = purchaseRecord.getPaymentMethod();
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

    // // Constructor
    // public PurchaseRecord(int purchaseID, int userID, double totalAmount, String
    // shippingAddress, String purchaseStatus, List<CartItem> books) {
    // this.purchaseID = purchaseID;
    // this.userID = userID;
    // this.totalAmount = totalAmount;
    // this.shippingAddress = shippingAddress;
    // this.purchaseStatus = purchaseStatus;
    // this.books = books;
    // this.userList = userList;
    // }

    // Getters and Setters
    public int getPurchaseID() {
        return purchaseID;
    }

    public String getUsername() {
        return username;
    }

    public String getPhone() {
        return phone;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPurchaseID(int purchaseID) {
        this.purchaseID = purchaseID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getPurchaseStatus() {
        return purchaseStatus;
    }

    public void setPurchaseStatus(String purchaseStatus) {
        this.purchaseStatus = purchaseStatus;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public List<CartItem> getBooks() {
        return books;
    }

    public void setBooks(List<CartItem> books) {
        this.books = books;
    }

    public void setpaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
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
        System.out.println("Purchase Method: " + paymentMethod);
        System.out.println("Books Purchased:");
        for (CartItem book : books) {
            System.out.println("  - Cart ID: " + book.getCartID());
            System.out.println("    User ID: " + book.getUserID());
            System.out.println("    Book ID: " + book.getId());
            System.out.println("    Title: " + book.getTitle());
            System.out.println("    Image: " + book.getImage());
            System.out.println("    Genre: " + book.getGenre());
            System.out.println("    Category: " + book.getCategory());
            System.out.println("    Price: $" + book.getPrice());
            System.out.println("    Units Purchased: " + book.getPurchaseUnit());
            System.out.println("    Total Price: $" + book.getTotalPrice());
            System.out.println("    Stock: " + book.getStock());
            System.out.println("    Language: " + book.getLanguage());
        }
    }

    public void setUser() {
        this.user = userList.getUserbyUserId(String.valueOf(userID));
    }



    public void setUserList(UserList userList) {
        this.userList = userList;
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
                String paymentMethod = (String) purchaseJSON.get("paymentMethod");
                String purchaseStatus = (String) purchaseJSON.get("purchaseStatus");

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
                        shippingAddress, paymentMethod, purchaseStatus, books);
                purchaseRecords.add(purchaseRecord);
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        return purchaseRecords;
    }

    public static void savePurchaseRecords(List<PurchaseRecord> purchaseRecords) {
        Gson gson = new Gson();
        try (FileWriter file = new FileWriter("d:/CAT Project/Paperme/backend/src/main/webapp/data/purchase.json")) {
            file.write(gson.toJson(purchaseRecords));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
