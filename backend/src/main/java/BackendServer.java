// import com.sun.net.httpserver.HttpServer;
// import org.bson.Document;

// import java.io.IOException;
// import java.io.OutputStream;
// import java.net.InetSocketAddress;
// import java.util.List;

// public class BackendServer {
//     public static void main(String[] args) throws IOException {
//         // Initialize MongoDB connection
//         MongoDBConnection dbConnection = new MongoDBConnection(
//                 "mongodb://localhost:27017", "my_database", "my_collection"
//         );

//         // Start the HTTP server
//         HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

//         // Define endpoint to retrieve all users
//         server.createContext("/users", exchange -> {
//             if ("GET".equals(exchange.getRequestMethod())) {
//                 List<Document> documents = dbConnection.getAllDocuments();
//                 StringBuilder responseText = new StringBuilder();
//                 for (Document doc : documents) {
//                     responseText.append(doc.toJson()).append("\n");
//                 }
//                 exchange.sendResponseHeaders(200, responseText.length());
//                 OutputStream os = exchange.getResponseBody();
//                 os.write(responseText.toString().getBytes());
//                 os.close();
//             } else {
//                 exchange.sendResponseHeaders(405, -1); // Method Not Allowed
//             }
//         });

//         // Define endpoint to insert a new user (for simplicity, inserting hardcoded data)
//         server.createContext("/addUser", exchange -> {
//             if ("POST".equals(exchange.getRequestMethod())) {
//                 Document newUser = new Document("name", "Jane Doe")
//                         .append("email", "jane.doe@example.com");
//                 dbConnection.insertDocument(newUser);
//                 String responseText = "User added successfully!";
//                 exchange.sendResponseHeaders(200, responseText.length());
//                 OutputStream os = exchange.getResponseBody();
//                 os.write(responseText.getBytes());
//                 os.close();
//             } else {
//                 exchange.sendResponseHeaders(405, -1); // Method Not Allowed
//             }
//         });

//         server.setExecutor(null); // Use default executor
//         server.start();
//         System.out.println("Server started on port 8080...");
//     }
// }

