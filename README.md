# Book Selling Website

About this application
-------------------------------------------------------
This project is a full-featured book selling website with two distinct user interfaces: a User UI for customers and an Admin UI for administrators.

### Features

#### User UI
1. **Payment and Shipping Management:** Users can set their preferred payment method and shipping address.
2. **Book Browsing and Filtering:** Users can view books with search and filter functionality based on language, category, and sorting options (rating and sales).
3. **Cart Management:** Users can:
   - View their cart.
   - Delete books from the cart.
   - Adjust book quantities directly in the cart.
4. **Order Management:**
   - Users can proceed with payment.
   - After payment, users can view their purchase history, which includes the total amount, purchase ID, and status of each purchase.

#### Admin UI
1. **Order Management:** Admins can update customers' order statuses.
2. **Stock Management:**
   - Search books based on the book ID, ISBN, or author.
   - Update stock levels.
3. **Product Management:** Admins can add new products to the catalog.

Running the program
-------------------------------------------------------
Clone this repo:
```
git clone https://github.com/WUNLIMZHE/cat201-project.git
cd cat201-project
```
**Running with Node** <br/>
1. Make sure you have Node.JS installed.<br/>
Node installation link: <br/>
```
https://nodejs.org/en
```

2. Navigate to the frontend directory.<br/>
```
cd .\frontend\
```

3. In the directory, install the dependencies using npm install.<br/>
```
npm install
```

4. Run the server:<br/>
```
npm run dev
```

5. Go to http://localhost:5173.
```
http://localhost:5173
```
**Running with Tomcat Server** <br/>
1. Make sure you have Apache Tomcat installed.<br/>
Tomcat installation link: <br/>
```
https://tomcat.apache.org/
```

2. Make sure you have Apache Maven installed.<br/>
Maven installation link: <br/>
```
https://maven.apache.org/
```

3. Navigate to the backend directory.<br/>
```
cd .\backend\
```

4. Run the server:<br/>
```
mvn tomcat7:run
```

5. Go to http://localhost:9000.
```
http://localhost:9000
```
