package com.sunnypapyrus.models;
public class Book {
  private int id;
  private String title;
  private long isbn;
  private String image;
  private String author;
  private String genre;
  private String category;
  private String description;
  private double price;
  private double review;
  private int soldUnits;
  private int stock;
  private String language;

  public Book(int id, String title, long isbn, String image, String author, String genre, String category, 
              String description, double price, double review, int soldUnits, int stock, String language) {
      this.id = id;
      this.title = title;
      this.isbn = isbn;
      this.image = image;
      this.author = author;
      this.genre = genre;
      this.category = category;
      this.description = description;
      this.price = price;
      this.review = review;
      this.soldUnits = soldUnits;
      this.stock = stock;
      this.language = language;
  }

  public int getId() {
      return id;
  }

  public void setId(int id) {
      this.id = id;
  }

  public String getTitle() {
      return title;
  }

  public void setTitle(String title) {
      this.title = title;
  }

  public long getIsbn() {
      return isbn;
  }

  public void setIsbn(long isbn) {
      this.isbn = isbn;
  }

  public String getImage() {
      return image;
  }

  public void setImage(String image) {
      this.image = image;
  }

  public String getAuthor() {
      return author;
  }

  public void setAuthor(String author) {
      this.author = author;
  }

  public String getGenre() {
      return genre;
  }

  public void setGenre(String genre) {
      this.genre = genre;
  }

  public String getCategory() {
      return category;
  }

  public void setCategory(String category) {
      this.category = category;
  }

  public String getDescription() {
      return description;
  }

  public void setDescription(String description) {
      this.description = description;
  }

  public double getPrice() {
      return price;
  }

  public void setPrice(double price) {
      this.price = price;
  }

  public double getReview() {
      return review;
  }

  public void setReview(double review) {
      this.review = review;
  }

  public int getSoldUnits() {
      return soldUnits;
  }

  public void setSoldUnits(int soldUnits) {
      this.soldUnits = soldUnits;
  }

  public int getStock() {
    return stock;
  }

public void setStock(int stock) {
    this.stock = stock;
}

  public String getLanguage() {
      return language;
  }

  public void setLanguage(String language) {
      this.language = language;
  }

  @Override
  public String toString() {
      return "Book{" +
              "id=" + id +
              ", title='" + title + '\'' +
              ", isbn=" + isbn +
              ", image='" + image + '\'' +
              ", author='" + author + '\'' +
              ", genre='" + genre + '\'' +
              ", category='" + category + '\'' +
              ", description='" + description + '\'' +
              ", price=" + price +
              ", review=" + review +
              ", soldUnits=" + soldUnits +
              ", stock=" + stock +
              ", language='" + language + '\'' +
              '}';
  }
}
