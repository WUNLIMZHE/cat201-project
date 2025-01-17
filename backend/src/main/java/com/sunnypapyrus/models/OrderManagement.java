package com.sunnypapyrus.models;

import java.util.ArrayList;
import java.util.List;
import java.io.FileReader;
import java.io.IOException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class OrderManagement {
    private List <PurchaseRecord> purchaseRecords;
    private List <String> username;
    private List <String> phone;
    private UserList userList;
    private UserEntity user;

    public OrderManagement() {
        purchaseRecords = new ArrayList<>();
        userList = new UserList();
        // loadPurchaseRecords();
        for (PurchaseRecord record : purchaseRecords) {
            record.setUserList(userList);
        }
    }

    public boolean loadPurchaseRecords() {

        // Reload purchase records from file
        purchaseRecords = new ArrayList<>();
        JSONParser parser = new JSONParser();
        try {
            JSONArray purchaseRecordsArray = (JSONArray) parser.parse(new FileReader("D:\\CAT Project\\Paperme\\backend\\src\\main\\webapp\\data\\purchase.json"));
            for (Object obj : purchaseRecordsArray) {
                JSONObject purchaseRecord = (JSONObject) obj;
                int purchaseID = purchaseRecord.get("purchaseID") != null ? Integer.parseInt(purchaseRecord.get("purchaseID").toString()) : 0;
                int userID = purchaseRecord.get("userID") != null ? Integer.parseInt(purchaseRecord.get("userID").toString()) : 0;
                String paymentMethod = purchaseRecord.get("paymentMethod") != null ? purchaseRecord.get("paymentMethod").toString() : "";
                double totalAmount = purchaseRecord.get("totalAmount") != null ? Double.parseDouble(purchaseRecord.get("totalAmount").toString()) : 0.0;
                String shippingAddress = purchaseRecord.get("shippingAddress") != null ? purchaseRecord.get("shippingAddress").toString() : "";
                String purchaseStatus = purchaseRecord.get("purchaseStatus") != null ? purchaseRecord.get("purchaseStatus").toString() : "";
                JSONArray booksArray = (JSONArray) purchaseRecord.get("books");
                List<CartItem> books = new ArrayList<>();
                for (Object bookObj : booksArray) {
                    JSONObject book = (JSONObject) bookObj;
                    int bookID = book.get("id") != null ? Integer.parseInt(book.get("id").toString()) : 0;
                    int quantity = book.get("purchaseUnit") != null ? Integer.parseInt(book.get("purchaseUnit").toString()) : 0;
                    String title = book.get("title") != null ? book.get("title").toString() : "";
                    CartItem cartItem = new CartItem(bookID, quantity);
                    cartItem.setTitle(title);
                    books.add(cartItem);
                }
                PurchaseRecord record = new PurchaseRecord(purchaseID, userID, totalAmount, shippingAddress, purchaseStatus, books, userList);
                record.setPurchaseMethod(paymentMethod);
                purchaseRecords.add(record);
            }
            return true;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean savePurchaseRecords(){
        // Save purchase records to file
        JSONArray purchaseRecordsArray = new JSONArray();
        for (PurchaseRecord record : purchaseRecords) {
            JSONObject purchaseRecord = new JSONObject();
            purchaseRecord.put("purchaseID", record.getPurchaseID());
            purchaseRecord.put("userID", record.getUserID());
            purchaseRecord.put("totalAmount", record.getTotalAmount());
            purchaseRecord.put("shippingAddress", record.getShippingAddress());
            JSONArray booksArray = new JSONArray();
            for (CartItem book : record.getBooks()) {
                JSONObject bookObj = new JSONObject();
                bookObj.put("bookID", book.getId());
                bookObj.put("quantity", book.getPurchaseUnit());
                booksArray.add(bookObj);
            }
            purchaseRecord.put("books", booksArray);
            purchaseRecordsArray.add(purchaseRecord);
        }
        try {
            // Write to file
            // FileWriter file = new FileWriter("D:\\CAT Project\\Paperme\\backend\\src\\main\\webapp\\data\\purchase.json");
            // file.write(purchaseRecordsArray.toJSONString());
            // file.flush();
            // file.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public List<PurchaseRecord> getPurchaseRecords() {
        return purchaseRecords;
    }

    public void setPurchaseRecords(List<PurchaseRecord> purchaseRecords) {
        this.purchaseRecords = purchaseRecords;
    }

    public UserList getUserList() {
        return userList;
    }

    public void setUserList(UserList userList) {
        this.userList = userList;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void mapUsername(){
        for (PurchaseRecord record : purchaseRecords) {
            for (UserEntity user : userList.getUsers()) {
                if (String.valueOf(record.getUserID()) == user.getuserid()) {
                    username.add(user.getUsername());
                }
            }
        }
    }

    public void mapPhone(){
        for (PurchaseRecord record : purchaseRecords) {
            for (UserEntity user : userList.getUsers()) {
                if (String.valueOf(record.getUserID()) == user.getuserid()) {
                    phone.add(user.getPhoneNumber());
                }
            }
        }
    }

    public void printPurchase() {
        for (PurchaseRecord record : purchaseRecords) {
            record.setUser();
            System.out.println("Purchase ID: " + record.getPurchaseID());
            System.out.println("Username: " + (record.getUser() != null ? record.getUser().getUsername() : "Unknown"));
            System.out.println("User ID: " + record.getUserID());
            System.out.println("Total Amount: " + record.getTotalAmount());
            System.out.println("Shipping Address: " + record.getShippingAddress());
            System.out.println("Books: ");
            for (CartItem book : record.getBooks()) {
                System.out.println("Book ID: " + book.getId());
                System.out.println("Title: " + book.getTitle());
                System.out.println("Quantity: " + book.getPurchaseUnit());
            }
        }
    }

}