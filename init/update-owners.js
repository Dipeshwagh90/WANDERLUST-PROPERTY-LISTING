const mongoose = require('mongoose');
const User = require('../models/user');
const Listing = require('../models/listing');

// MongoDB connection URL from your environment
const ATLAS_DB_URL = "mongodb+srv://dipeshwagh888:dipesh123@cluster0.echvnio.mongodb.net/WanderLust?retryWrites=true&w=majority&appName=Cluster0";

async function updateListingOwners() {
    try {
        // Connect to MongoDB
        await mongoose.connect(ATLAS_DB_URL);
        console.log("Database connected!");

        // Find the first user (or you can specify a username to find a specific user)
        const user = await User.findOne({});
        
        if (!user) {
            console.log("No users found. Please create a user account first.");
            return;
        }

        console.log(`Found user: ${user.username} with ID: ${user._id}`);

        // Update all listings to use this user as owner
        const result = await Listing.updateMany(
            {}, // match all documents
            { $set: { owner: user._id } } // set the owner field to the user's ID
        );

        console.log(`Updated ${result.modifiedCount} listings with new owner ID`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed");
    }
}

// Run the update function
updateListingOwners();