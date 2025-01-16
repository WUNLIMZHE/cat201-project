package com.sunnypapyrus;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.io.Reader;

@SuppressWarnings("unused")
@WebListener
public class AppContextListener implements ServletContextListener {
    private static final String USER_DATA_FILE = "src/main/resources/data/UserData.json";
    private static final String PRODUCT_DATA_FILE = "src/main/resources/data/productData.json";

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Context initialized.");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Context destroyed. Saving data to JSON files...");
    }
}