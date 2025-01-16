import com.mongodb.client.*;

public class MongoDBConnection {
    private static final String CONNECTION_URI = "mongodb://localhost:27017";
    private static final String DATABASE_NAME = "library";

    public static MongoDatabase getDatabase() {
        MongoClient mongoClient = MongoClients.create(CONNECTION_URI);
        return mongoClient.getDatabase(DATABASE_NAME);
    }
}
