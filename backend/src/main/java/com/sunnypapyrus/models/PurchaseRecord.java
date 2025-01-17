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



public class PurchaseRecord {
    private UserList userList;
    private UserEntity user;
    private int purchaseID;
    private int userID;

    /**
     * 1. Pending
    2. Confirmed
    3. Processing
    4. Shipped
    5. Out for Delivery
    6. Delivered
    7. Cancelled/Failed
    8. Returned/Refunded */
    private String purchaseStatus;
    private double totalAmount;
    private String shippingAddress;
    private String purchaseMethod;
    private List<CartItem> books; // Using CartItem to store purchased books

    // Constructor
    public PurchaseRecord(int purchaseID, int userID, double totalAmount, String shippingAddress, String purchaseStatus, List<CartItem> books) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.purchaseStatus = purchaseStatus;
        this.books = books;
    }

    // Constructor
    public PurchaseRecord(int purchaseID, int userID, double totalAmount, String shippingAddress, String purchaseStatus, List<CartItem> books, UserList userList) {
        this.purchaseID = purchaseID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.purchaseStatus = purchaseStatus;
        this.books = books;
        this.userList = userList;
        setUser(); // Initialize the user field
    }

    // Getters and Setters
    public int getPurchaseID() {
        return purchaseID;
    }

    public String getPurchaseMethod() {
        return purchaseMethod;
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

    public void setPurchaseMethod(String purchaseMethod) {
        this.purchaseMethod = purchaseMethod;
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
        System.out.println("Purchase Method: " + purchaseMethod);
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

}
