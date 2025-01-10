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
            userJson.put("address", user.getAddresses());
            userJson.put("phone", user.getPhoneNumber());

            userJson.put("role", user.getRole());

            userList.add(userJson);
        }

        try (FileWriter file = new FileWriter("users.json")) {
            file.write(userList.toJSONString());
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void loadUsers() {
        JSONParser parser = new JSONParser();
        try {
            JSONArray userList = (JSONArray) parser.parse(new FileReader("users.json"));
            for (Object obj : userList) {
                JSONObject userJson = (JSONObject) obj;
                UserEntity user = new UserEntity();
                user.setUsername((String) userJson.get("username"));
                user.setEmail((String) userJson.get("email"));
                user.setFirstName((String) userJson.get("firstName"));
                user.setLastName((String) userJson.get("lastName"));
                this.users.add(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean registerUser(String username, String password, String firstName, String lastName, String phoneNumber,
            String email) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader(
                "d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("username").equals(username) || userDetails.get("email").equals(email)
                        || userDetails.get("phoneNumber").equals(phoneNumber)) {
                    return false;
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        UserEntity newUser = new UserEntity(username, password, firstName, lastName, phoneNumber, email);
        this.addUser(newUser);
        return true;
    }

    public boolean loginUser(String username, String password) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader(
                "d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
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

    public UserEntity getUserByUsername(String username) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader(
                "d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("username").equals(username)) {
                    UserEntity currentUser = new UserEntity();
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

    public UserEntity getUserByEmail(String email) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader(
                "d:/CAT Project/Paperme/backend/src/main/resources/Data/UserData.json")) {
            Object obj = parser.parse(reader);
            JSONArray usersArray = (JSONArray) obj;
            for (Object user : usersArray) {
                JSONObject userDetails = (JSONObject) user;
                if (userDetails.get("email").equals(email)) {
                    UserEntity currentUser = new UserEntity();
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
}
