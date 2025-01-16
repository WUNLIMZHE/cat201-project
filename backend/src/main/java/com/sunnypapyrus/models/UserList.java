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

@SuppressWarnings("unused")
public class UserList {
    private List<UserEntity> users;
    private static UserEntity currentUser;

    public UserList() {
        this.users = new ArrayList<UserEntity>();
        loadUsers();
    }

    public void addUser(UserEntity user) {
        this.users.add(user);
        saveUsers();
    }

    public List<UserEntity> getUsers() {
        loadUsers(); // Reload the latest data
        return this.users;
    }

    public static UserEntity getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(String currentuser) {
        UserEntity user = getUserByUsername(currentuser);
        currentUser = user;
    }

    public void removeUserByUsername(String username) {
        this.users.removeIf(user -> user.getUsername().equals(username));
        saveUsers();
    }

    @SuppressWarnings("unchecked")
    public void saveUsers() {
        JSONArray userList = new JSONArray();
        for (UserEntity user : this.users) {
            JSONObject userJson = new JSONObject();
            userJson.put("userid", user.getuserid());
            userJson.put("username", user.getUsername());
            userJson.put("password", user.getPassword());
            userJson.put("email", user.getEmail());
            userJson.put("firstName", user.getFirstName());
            userJson.put("lastName", user.getLastName());
            userJson.put("phoneNumber", user.getPhoneNumber());
            userJson.put("role", user.getRole());

            JSONArray addressesArray = new JSONArray();
            for (Address address : user.getAddresses()) {
                JSONObject addressJson = new JSONObject();
                addressJson.put("addressid", address.getAddressid());
                addressJson.put("street", address.getStreet());
                addressJson.put("city", address.getCity());
                addressJson.put("state", address.getState());
                addressJson.put("zipcode", address.getzipcode());
                addressJson.put("country", address.getCountry());
                addressesArray.add(addressJson);
            }
            userJson.put("addresses", addressesArray);

            JSONArray paymentArray = new JSONArray();
            for (Payment payment : user.getPayments()) {
                JSONObject paymentJson = new JSONObject();
                paymentJson.put("paymentid", payment.getPaymentid());
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
            this.users.clear(); // Clear the current list before loading
            for (Object obj : userList) {
                JSONObject userJson = (JSONObject) obj;
                UserEntity user = new UserEntity();
                user.setuserid((String) userJson.get("userid"));
                user.setFirstName((String) userJson.get("firstName"));
                user.setPassword((String) userJson.get("password"));
                user.setLastName((String) userJson.get("lastName"));
                user.setPhoneNumber((String) userJson.get("phoneNumber"));
                user.setEmail((String) userJson.get("email"));
                user.setUsername((String) userJson.get("username"));
                user.setRole((String) userJson.get("role"));

                JSONArray addressesArray = (JSONArray) userJson.get("addresses");
                for (Object addressObj : addressesArray) {
                    JSONObject addressJson = (JSONObject) addressObj;
                    Address address = new Address(
                            (String) addressJson.get("addressid"),
                            (String) addressJson.get("street"),
                            (String) addressJson.get("city"),
                            (String) addressJson.get("state"),
                            (String) addressJson.get("zipcode"),
                            (String) addressJson.get("country"));
                    user.getAddresses().add(address);
                }

                JSONArray paymentArray = (JSONArray) userJson.get("payments");
                for (Object paymentObj : paymentArray) {
                    JSONObject paymentJson = (JSONObject) paymentObj;
                    String paymentMethod = (String) paymentJson.get("paymentMethod");
                    Payment payment = new Payment(
                            (String) paymentJson.get("paymentid"),
                            (String) paymentJson.get("cardholderName"),
                            (String) paymentJson.get("cardNumber"),
                            (String) paymentJson.get("expiryDate"),
                            (String) paymentJson.get("cardType"),
                            (String) paymentJson.get("cvv"));
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
        newUser.setuserid(getlatestuserid());
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setPhoneNumber(phoneNumber);
        newUser.setEmail(email);
        newUser.setRole("user");
        this.addUser(newUser);
        saveUsers();
        return true;
    }

    public String getlatestuserid() {
        int latestuserid = 0;
        for (UserEntity user : users) {
            int userid = Integer.parseInt(user.getuserid());
            if (userid > latestuserid) {
                latestuserid = userid;
            }
        }
        if (latestuserid == 0) {
            return "1";
        }
        return String.valueOf(latestuserid + 1);
    }

    public String getlatestaddressid() {
        int latestaddressid = 0;
        for (UserEntity user : users) {
            for (Address address : user.getAddresses()) {
                int addressid = Integer.parseInt(address.getAddressid());
                if (addressid > latestaddressid) {
                    latestaddressid = addressid;
                }
            }
        }
        if (latestaddressid == 0) {
            return "1";
        }
        return String.valueOf(latestaddressid + 1);
    }

    public String getlatestpaymentid() {
        int latestpaymentid = 0;
        for (UserEntity user : users) {
            for (Payment payment : user.getPayments()) {
                int paymentid = Integer.parseInt(payment.getPaymentid());
                if (paymentid > latestpaymentid) {
                    latestpaymentid = paymentid;
                }
            }
        }
        if (latestpaymentid == 0) {
            return "1";
        }
        return String.valueOf(latestpaymentid + 1);
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

    public boolean addAddress(String username, String street, String city, String state, String zipcode,
            String country) {
        if (username == null || street == null || city == null || state == null || zipcode == null || country == null) {
            return false;
        }
        UserEntity user = getUserByUsername(username);
        if (user != null) {
            Address newAddress = new Address(getlatestaddressid(), street, city, state, zipcode, country);
            user.addAddress(newAddress);
            currentUser.addAddress(newAddress);
            saveUsers();
            loadUsers(); // Reload the latest data
            return true;
        }
        return false;
    }

    public boolean addPayment(String username,
            String cardholderName,
            String cardNumber,
            String expiryDate,
            String cardType,
            String cvv) {
        UserEntity user = getUserByUsername(username);
        if (user != null) {
            Payment newPayment = new Payment(getlatestpaymentid(), cardholderName, cardNumber, expiryDate,
                    cardType, cvv);
            user.addPayment(newPayment);
            currentUser.addPayment(newPayment);
            saveUsers();
            loadUsers(); // Reload the latest data
            return true;
        }
        return false;
    }

    public boolean removeAddressById(String username, String addressid) {
        UserEntity user = getUserByUsername(username);
        if (user != null) {
            boolean addressRemoved = user.removeAddressById(addressid);
            if (addressRemoved) {
                saveUsers();
                loadUsers(); // Reload the latest data
                return true;
            }
        }
        return false;
    }

    public boolean removePaymentById(String username, String paymentid) {
        UserEntity user = getUserByUsername(username);
        if (user != null) {
            boolean paymentRemoved = user.removePaymentById(paymentid);
            if (paymentRemoved) {
                saveUsers();
                loadUsers(); // Reload the latest data
                return true;
            }
        }
        return false;
    }

}