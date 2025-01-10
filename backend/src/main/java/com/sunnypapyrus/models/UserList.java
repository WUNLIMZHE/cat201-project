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

public class UserList {
    private List<UserEntity> users;
    private static UserEntity currentUser;

    public UserList() {
        this.users = new ArrayList<UserEntity>();
        loadUsers();
    }

    public void addUser(UserEntity user) {
        this.users.add(user);
    }

    public List<UserEntity> getUsers() {
        return this.users;
    }

    public static UserEntity getCurrentUser() {
        return currentUser;
    }

    public static void setCurrentUser(UserEntity user) {
        currentUser = user;
    }

    public void removeUserByUsername(String username) {
        this.users.removeIf(user -> user.getUsername().equals(username));
    }

    public void saveUsers() {
        JSONArray userList = new JSONArray();
        for (UserEntity user : this.users) {
            JSONObject userJson = new JSONObject();
            userJson.put("username", user.getUsername());
            userJson.put("email", user.getEmail());
            userJson.put("firstName", user.getFirstName());
            userJson.put("lastName", user.getLastName());
            userJson.put("phoneNumber", user.getPhoneNumber());
            userJson.put("role", user.getRole());

            JSONArray addressesArray = new JSONArray();
            for (Address address : user.getAddresses()) {
                JSONObject addressJson = new JSONObject();
                addressJson.put("addressId", address.getAddressId());
                addressJson.put("street", address.getStreet());
                addressJson.put("city", address.getCity());
                addressJson.put("state", address.getState());
                addressJson.put("zipCode", address.getZipCode());
                addressJson.put("country", address.getCountry());
                addressesArray.add(addressJson);
            }
            userJson.put("addresses", addressesArray);

            JSONArray paymentArray = new JSONArray();
            for (Payment payment : user.getPayments()) {
                JSONObject paymentJson = new JSONObject();
                paymentJson.put("paymentMethod", payment.getpaymentMethod());
                paymentJson.put("cardholderName", payment.getcardholderName());
                paymentJson.put("cardNumber", payment.getcardNumber());
                paymentJson.put("expiryDate", payment.getexpiryDate());
                paymentJson.put("cardType", payment.getcardType());
                paymentJson.put("cvv", payment.getCvv());
                paymentArray.add(paymentJson);
            }
            userJson.put("payments", paymentArray);

            userList.add(userJson);
        }

        try (FileWriter file = new FileWriter("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            file.write(userList.toJSONString());
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void loadUsers() {
        JSONParser parser = new JSONParser();
        try {
            JSONArray userList = (JSONArray) parser
                    .parse(new FileReader("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json"));
            for (Object obj : userList) {
                JSONObject userJson = (JSONObject) obj;
                UserEntity user = new UserEntity();
                user.setFirstName((String) userJson.get("firstName"));
                user.setLastName((String) userJson.get("lastName"));
                user.setPhoneNumber((String) userJson.get("phoneNumber"));
                user.setEmail((String) userJson.get("email"));
                user.setUsername((String) userJson.get("username"));
                user.setRole((String) userJson.get("role"));

                JSONArray addressesArray = (JSONArray) userJson.get("addresses");
                for (Object addressObj : addressesArray) {
                    JSONObject addressJson = (JSONObject) addressObj;
                    Long addressId = (Long) addressJson.get("addressId");
                    if (addressId == null) {
                        addressId = 0L; // Default value if addressId is null
                    }
                    Address address = new Address(
                            addressId,
                            (String) addressJson.get("street"),
                            (String) addressJson.get("city"),
                            (String) addressJson.get("state"),
                            (String) addressJson.get("zipCode"),
                            (String) addressJson.get("country"));
                    user.getAddresses().add(address);
                }

                JSONArray paymentArray = (JSONArray) userJson.get("payments");
                for (Object paymentObj : paymentArray) {
                    JSONObject paymentJson = (JSONObject) paymentObj;
                    Long paymentMethod = (Long) paymentJson.get("paymentMethod");
                    if (paymentMethod == null) {
                        paymentMethod = 0L; // Default value if paymentMethod is null
                    }
                    Payment payment = new Payment(
                            paymentMethod,
                            (String) paymentJson.get("cardholderName"),
                            (Long) paymentJson.get("cardNumber"),
                            (String) paymentJson.get("expiryDate"),
                            (String) paymentJson.get("cardType"),
                            (Long) paymentJson.get("cvv"));
                    user.getPayments().add(payment);
                }

                this.users.add(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean registerUser(String username, String password, String firstName, String lastName, String phoneNumber,
            String email) {
        for (UserEntity user : users) {
            if (user.getUsername().equals(username) || user.getEmail().equals(email)
                    || user.getPhoneNumber().equals(phoneNumber)) {
                return false;
            }
        }
        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setPhoneNumber(phoneNumber);
        newUser.setEmail(email);
        this.addUser(newUser);
        saveUsers();
        return true;
    }

    public boolean loginUser(String username, String password) {
        for (UserEntity user : users) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    public UserEntity getUserByUsername(String username) {
        for (UserEntity user : users) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }
        return null;
    }

    public boolean addAddress(String username, String street, String city, String state, String zipCode,
            String country) {
        UserEntity user = getUserByUsername(username);
        if (user != null) {
            Address newAddress = new Address(user.getCurrentAddressId(user) + 1, street, city, state, zipCode, country);
            user.addAddress(newAddress);
            saveUsers();
            return true;
        }
        return false;
    }

    public boolean addPayment(String username,
            String cardholderName,
            long cardNumber,
            String expiryDate,
            String cardType,
            long cvv) {
        UserEntity user = getUserByUsername(username);
        if (user != null) {
            Payment newPayment = new Payment(user.getCurrentPaymentId(user) + 1, cardholderName, cardNumber, expiryDate,
                    cardType, cvv);
            user.addPayment(newPayment);
            saveUsers();
            return true;
        }
        return false;
    }

    public boolean removeAddress(String username, long addressId) {
        UserEntity user = getUserByUsername(username);
        if (user != null) {
            Address address = user.getAddresses().stream().filter(a -> a.getAddressId() == addressId).findFirst()
                    .orElse(null);
            user.removeAddress(address);
            saveUsers();
            return true;
        }
        return false;
    }

    public boolean removePayment(String username, long paymentMethod) {
        UserEntity user = getUserByUsername(username);
        if (user != null) {
            Payment payment = user.getPayments().stream().filter(p -> p.getpaymentMethod() == paymentMethod).findFirst()
                    .orElse(null);
            user.removePayment(payment);
            
            saveUsers();
            return true;
        }
        return false;
    }
}