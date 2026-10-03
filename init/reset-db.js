const mongoose = require('mongoose');
const User = require('../models/user');
const Listing = require('../models/listing');
const { data } = require('./data');

// MongoDB connection URL
const ATLAS_DB_URL = "mongodb+srv://dipeshwagh888:dipesh123@cluster0.echvnio.mongodb.net/WanderLust?retryWrites=true&w=majority&appName=Cluster0";

async function resetDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(ATLAS_DB_URL);
        console.log("Database connected!");

        // Drop existing collections
        await mongoose.connection.dropCollection('listings');
        await mongoose.connection.dropCollection('users');
        console.log("Dropped existing collections");

        // Create a new user
        const newUser = new User({
            email: "admin@wanderlust.com",
            username: "admin"
        });

        // Register the user using passport-local-mongoose
        const registeredUser = await User.register(newUser, "admin123");
        console.log(`Created new user: ${registeredUser.username} with ID: ${registeredUser._id}`);

        // Update listings data with the new user's ID
        const listingsWithOwner = data.map(listing => ({
            ...listing,
            owner: registeredUser._id
        }));

        // Insert all listings
        const insertedListings = await Listing.insertMany(listingsWithOwner);
        console.log(`Inserted ${insertedListings.length} listings`);

        console.log("\nDatabase reset complete!");
        console.log("\nYou can now log in with:");
        console.log("Username: admin");
        console.log("Password: admin123");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\nDatabase connection closed");
    }
}

// Run the reset
resetDatabase();