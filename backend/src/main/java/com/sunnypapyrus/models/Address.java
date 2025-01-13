package com.sunnypapyrus.models;

public class Address {

    private long addressId;

    private String street;
    private String city;

    private String state;
    private String zipcode;

    private String country;

    public Address(long addressId, String street, String city, String state, String zipcode, String country) {
        this.addressId = addressId;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.country = country;
    }
    
    public long getAddressId() {
        return this.addressId;
    }
    
    public String getStreet() {
        return this.street;
    }
    
    public String getCity() {
        return this.city;
    }
    
    public String getState() {
        return this.state;
    }
    
    public String getzipcode() {
        return this.zipcode;
    }
    
    public String getCountry() {
        return this.country;
    }
    
    public void setAddressId(long addressId) {
        this.addressId = addressId;
    }
    
    public void setStreet(String street) {
        this.street = street;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public void setState(String state) {
        this.state = state;
    }
    
    public void setzipcode(String zipcode) {
        this.zipcode = zipcode;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
}
