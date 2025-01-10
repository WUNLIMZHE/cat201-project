//create a class that stores the payment information
package com.sunnypapyrus.models;

public class Payment {
    private long paymentId;
    private long userId;
    private String cardNumber;
    private String cardHolder;
    private String expirationDate;
    private String cvv;

    public Payment( long userId, String cardNumber, String cardHolder, String expirationDate, String cvv) {
        this.userId = userId;
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
    }

    public long getPaymentId() {
        return this.paymentId;
    }

    public long getUserId() {
        return this.userId;
    }

    public String getCardNumber() {
        return this.cardNumber;
    }

    public String getCardHolder() {
        return this.cardHolder;
    }

    public String getExpirationDate() {
        return this.expirationDate;
    }

    public String getCvv() {
        return this.cvv;
    }

    public void setPaymentId(long paymentId) {
        this.paymentId = paymentId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setCardHolder(String cardHolder) {
        this.cardHolder = cardHolder;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }
}