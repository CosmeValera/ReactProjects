package src;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class BirdsterApp {

    public static void main(String[] args) {
        // Database credentials
        String url = "jdbc:postgresql://localhost:5432/birdster"; // Adjust the URL if needed
        String user = "postgres";
        String password = "2606cosme";

        // Connect to PostgreSQL database
        try (Connection connection = DriverManager.getConnection(url, user, password);
             Statement statement = connection.createStatement()) {

            System.out.println("Connected to PostgreSQL successfully!");

            // Execute a query to get all tweets
            ResultSet tweetsResults = statement.executeQuery("SELECT * FROM tweets");
            while (tweetsResults.next()) {
                System.out.println("Tweet: " + tweetsResults.getString("tweet_content"));
            }

            // Execute a query to get all users
            ResultSet usersResults = statement.executeQuery("SELECT * FROM users");
            while (usersResults.next()) {
                System.out.println("User: " + usersResults.getString("username"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Connection failed!");
        }
    }
}
