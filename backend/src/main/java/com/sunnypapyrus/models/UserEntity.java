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

public class UserEntity {
    private String userid;
    private String username;
    private String password;

    private String firstName;
    private String lastName;
    private String phoneNumber;

    private String email;
    private String role;
    private List<Payment> payments = new ArrayList<Payment>();

    private List<Address> addresses = new ArrayList<Address>();

    public UserEntity() {
    }

    public UserEntity(String username, String password, String firstName, String lastName, String phoneNumber,
            String email) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.role = "user";
        this.payments = new ArrayList<Payment>();
        this.addresses = new ArrayList<Address>();
        saveUserData();
    }

    public String getuserid() {
        return this.userid;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getRole() {
        return this.role;
    }

    public List<Payment> getPayments() {
        return this.payments;
    }

    public List<Address> getAddresses() {
        return this.addresses;
    }

    public void setuserid(String userid) {
        this.userid = userid;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void updateUserInfo(String firstName, String lastName, String phoneNumber, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public boolean hasRole(String role) {
        return this.role.equals(role);
    }

    public UserEntity getUserByUsername(String username) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader(
                "d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("username").equals(username)) {
                    UserEntity userEntity = new UserEntity();
                    userEntity.setUsername((String) userDetails.get("username"));
                    userEntity.setPassword((String) userDetails.get("password"));
                    userEntity.setFirstName((String) userDetails.get("firstName"));
                    userEntity.setLastName((String) userDetails.get("lastName"));
                    userEntity.setPhoneNumber((String) userDetails.get("phoneNumber"));
                    userEntity.setEmail((String) userDetails.get("email"));
                    userEntity.setRole((String) userDetails.get("role"));
                    return userEntity;
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public UserEntity getDetails(){
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(this.username);
        userEntity.setFirstName(this.firstName);
        userEntity.setLastName(this.lastName);
        userEntity.setPhoneNumber(this.phoneNumber);
        userEntity.setEmail(this.email);
        userEntity.setRole(this.role);
        return userEntity;
    }

    public String getUsernameByID(String userID){
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader(
                "d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("userid").equals(userID)) {
                    return (String) userDetails.get("username");
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getUserPhoneByID (String userID) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader(
                "d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("userid").equals(userID)) {
                    return (String) userDetails.get("phoneNumber");
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private void saveUserData() {
        JSONParser parser = new JSONParser();
        JSONArray usersArray = new JSONArray();
        try (FileReader reader = new FileReader(
                "d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            usersArray = (JSONArray) obj;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        JSONObject userDetails = new JSONObject();
        userDetails.put("username", this.username);
        userDetails.put("password", this.password);
        userDetails.put("firstName", this.firstName);
        userDetails.put("lastName", this.lastName);
        userDetails.put("phoneNumber", this.phoneNumber);
        userDetails.put("email", this.email);
        userDetails.put("role", this.role);
        userDetails.put("addresses", this.addresses);
        userDetails.put("payments", this.payments);
        usersArray.add(userDetails);

        try (FileWriter file = new FileWriter("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            file.write(usersArray.toJSONString());
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void addAddress(Address address) {
        this.addresses.add(address);
        System.out.println("Address " + address.getStreet() + " has been added to " + this.username + "'s profile.");
    }

    public void removeAddress(Address address) {
        this.addresses.remove(address);
        System.out
                .println("Address " + address.getStreet() + " has been removed from " + this.username + "'s profile.");
    }

    public void addPayment(Payment payment) {
        this.payments.add(payment);
        System.out.println(
                "Payment method " + payment.getcardType() + " has been added to " + this.username + "'s profile.");
    }

    public void removePayment(Payment payment) {
        this.payments.remove(payment);
        System.out.println(
                "Payment method " + payment.getcardType() + " has been removed from " + this.username + "'s profile.");
    }

    public static void main(String[] args) {
        UserEntity newUser = new UserEntity("sunnypapyrus", "password", "Sunny", "Papyrus", "1234567890",
                "sunny@example.com");
        System.out.println("User " + newUser.getUsername() + " has been signed up successfully.");
    }

    public String toString() {
        return "UserSingup(username=" + this.getUsername() + ", password=" + this.getPassword() + ")";
    }

    public boolean removeAddressById(String addressid) {
        for (Address address : addresses) {
            if (address.getAddressid().equals(addressid)) {
                addresses.remove(address);
                System.out.println("Address with id " + addressid + " has been removed from " + this.username + "'s profile.");
                return true;
            }
        }
        return false;
    }

    public boolean removePaymentById(String paymentid) {
        for (Payment payment : payments) {
            if (payment.getPaymentid().equals(paymentid)) {
                payments.remove(payment);
                System.out.println("Payment with id " + paymentid + " has been removed from " + this.username + "'s profile.");
                return true;
            }
        }
        return false;
    }
}
