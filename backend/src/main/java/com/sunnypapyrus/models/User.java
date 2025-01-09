package com.sunnypapyrus.models;

import java.io.FileWriter;
import java.io.IOException;
import java.io.FileReader;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class User {
    private long userId;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;

    public User() {
    }

    public long getCurrentUserid() {
        // return the current user id from database
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            if (!usersArray.isEmpty()) {
                JSONObject lastUser = (JSONObject) usersArray.get(usersArray.size() - 1);
                return (long) lastUser.get("userId");
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return 0;
    }
    public User(String username, String password, String firstName, String lastName, String phoneNumber, String email) {
        this.userId = getCurrentUserid() + 1;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        saveUserData();
    }

    // validate login
    public boolean loginUser(String username, String password) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("username").equals(username) && userDetails.get("password").equals(password)) {
                    return true;
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    public User getUserByUsername(String username) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("username").equals(username)) {
                    User currentUser = new User();
                    currentUser.setUsername((String) userDetails.get("username"));
                    currentUser.setEmail((String) userDetails.get("email"));
                    currentUser.setFirstName((String) userDetails.get("firstName"));
                    currentUser.setLastName((String) userDetails.get("lastName"));
                    return currentUser;
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return null;
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

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public User getUserByEmail(String email) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("email").equals(email)) {
                    User currentUser = new User();
                    currentUser.setUsername((String) userDetails.get("username"));
                    currentUser.setEmail((String) userDetails.get("email"));
                    currentUser.setFirstName((String) userDetails.get("firstName"));
                    currentUser.setLastName((String) userDetails.get("lastName"));
                    return currentUser;
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    private void saveUserData() {
        JSONParser parser = new JSONParser();
        JSONArray usersArray = new JSONArray();
        try (FileReader reader = new FileReader("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            usersArray = (JSONArray) obj;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        JSONObject userDetails = new JSONObject();
        userDetails.put("userId", this.userId);
        userDetails.put("username", this.username);
        userDetails.put("password", this.password);
        userDetails.put("firstName", this.firstName);
        userDetails.put("lastName", this.lastName);
        userDetails.put("phoneNumber", this.phoneNumber);
        userDetails.put("email", this.email);

        usersArray.add(userDetails);

        try (FileWriter file = new FileWriter("d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            file.write(usersArray.toJSONString());
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        User newUser = new User("sunnypapyrus", "password", "Sunny", "Papyrus", "1234567890", "sunny@example.com");
        System.out.println("User " + newUser.getUsername() + " has been signed up successfully.");
    }

    public String toString() {
        return "UserSingup(username=" + this.getUsername() + ", password=" + this.getPassword() + ")";
    }
}


