// package com.sunnypapyrus.models;

// import java.util.ArrayList;
// import java.util.List;

// import java.io.FileWriter;
// import java.io.IOException;
// import java.io.FileReader;
// import org.json.simple.JSONArray;
// import org.json.simple.JSONObject;
// import org.json.simple.parser.JSONParser;
// import org.json.simple.parser.ParseException;
// import com.google.gson.Gson;
// import com.google.gson.GsonBuilder;
// import com.google.gson.JsonElement;
// import com.google.gson.JsonObject;
// import com.google.gson.JsonSerializationContext;
// import com.google.gson.JsonSerializer;
// import java.lang.reflect.Type;

// public class PurchaseRecord {
//     private UserList userList;
//     private UserEntity user;
//     private int purchaseID;
//     private int userID;

//     /**
//      * 1. Pending
//      * 2. Confirmed
//      * 3. Processing
//      * 4. Shipped
//      * 5. Out for Delivery
//      * 6. Delivered
//      * 7. Cancelled/Failed
//      * 8. Returned/Refunded
//      */
//     private String purchaseStatus;
//     private double totalAmount;
//     private String shippingAddress;
//     //private String paymentMethod;
//     private String username;
//     private String phone;
//     private List<CartItem> books; // Using CartItem to store purchased books

    // // Constructor
    // public PurchaseRecord(int purchaseID, int userID, double totalAmount,
    // String shippingAddress, String paymentMethod, String purchaseStatus,
    // List<CartItem> books) {
    // this.purchaseID = purchaseID;
    // this.userID = userID;
    // this.totalAmount = totalAmount;
    // this.shippingAddress = shippingAddress;
    // this.purchaseStatus = purchaseStatus;
    // this.books = books;
    // this.paymentMethod = paymentMethod;
    // this.user = new UserEntity(); // Initialize user object
    // this.username = user.getUsernameByID(String.valueOf(userID));
    // this.phone = user.getUserPhoneByID(String.valueOf(userID));
    // }

    // Constructor




    // public void addBook(CartItem book) {
    //     books.add(book);
    // }



    

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
    // public int getPurchaseID() {
    //     return purchaseID;
    // }



    // public String getPaymentMethod() {
    //     return paymentMethod;
    // }

    // public void setpaymentMethod(String paymentMethod) {
    //     this.paymentMethod = paymentMethod;
    // }

    // public UserList getUserList() {
    //     return userList;
    // }

    // public UserEntity getUser() {
    //     return user;
    // }

    // Method to display purchase record details
    // public void displayPurchaseRecord() {
    //     System.out.println("Purchase ID: " + purchaseID);
    //     System.out.println("User ID: " + userID);
    //     System.out.println("Purchase Status: " + purchaseStatus);
    //     System.out.println("Total Amount: $" + totalAmount);
    //     System.out.println("Shipping Address: " + shippingAddress);
    //     System.out.println("Purchase Method: " + paymentMethod);
    //     System.out.println("Books Purchased:");
    //     for (CartItem book : books) {
    //         System.out.println("  - Cart ID: " + book.getCartID());
    //         System.out.println("    User ID: " + book.getUserID());
    //         System.out.println("    Book ID: " + book.getId());
    //         System.out.println("    Title: " + book.getTitle());
    //         System.out.println("    Image: " + book.getImage());
    //         System.out.println("    Genre: " + book.getGenre());
    //         System.out.println("    Category: " + book.getCategory());
    //         System.out.println("    Price: $" + book.getPrice());
    //         System.out.println("    Units Purchased: " + book.getPurchaseUnit());
    //         System.out.println("    Total Price: $" + book.getTotalPrice());
    //         System.out.println("    Stock: " + book.getStock());
    //         System.out.println("    Language: " + book.getLanguage());
    //     }
    // }
