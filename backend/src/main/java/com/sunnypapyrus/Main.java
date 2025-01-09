package com.sunnypapyrus;
import com.sunnypapyrus.models.User;

public class Main {
    public static void main(String[] args) {
        System.setProperty("user.dir", "d:/CAT Project/Paperme/backend/src/main/resources/Data");
        User newUser = new User("sunnypapyrus", "123456", "Sunny", "Papyrus", "+60124609110", "sunny@example.com");
        System.out.println("Hello world!");
    }
}