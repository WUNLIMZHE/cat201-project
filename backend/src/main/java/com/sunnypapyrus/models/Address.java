package com.sunnypapyrus.models;

public class Address {

    private long addressId;

    private String street;
    private String city;

    private String state;
    private String zipCode;

    private String country;

    public Address(long addressId, String street, String city, String state, String zipCode, String country) {
        this.addressId = addressId;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
    }
    
    public void addAddress(Address address) {
        this.addressId = address.getAddressId();
        this.street = address.getStreet();
        this.city = address.getCity();
        this.state = address.getState();
        this.zipCode = address.getZipCode();
        this.country = address.getCountry();
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
    
    public String getZipCode() {
        return this.zipCode;
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
    
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
}
