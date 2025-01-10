package com.sunnypapyrus.models;

public class Payment {

    private long paymentMethod;

    private String cardholderName;
    private long cardNumber;

    private String expiryDate;
    private String cardType;

    private long cvv;

    public Payment(long paymentMethod, String cardholderName, long cardNumber, String expiryDate, String cardType, long cvv) {
        this.paymentMethod = paymentMethod;
        this.cardholderName = cardholderName;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cardType = cardType;
        this.cvv = cvv;
    }
    
    public long getpaymentMethod() {
        return this.paymentMethod;
    }
    
    public String getcardholderName() {
        return this.cardholderName;
    }
    
    public long getcardNumber() {
        return this.cardNumber;
    }
    
    public String getexpiryDate() {
        return this.expiryDate;
    }
    
    public String getcardType() {
        return this.cardType;
    }
    
    public long getCvv() {
        return this.cvv;
    }
    
    public void setpaymentMethod(long paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public void setcardholderName(String cardholderName) {
        this.cardholderName = cardholderName;
    }
    
    public void setcardNumber(long cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public void setexpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }
    
    public void setcardType(String cardType) {
        this.cardType = cardType;
    }
    
    public void setCvv(long cvv) {
        this.cvv = cvv;
    }
}
