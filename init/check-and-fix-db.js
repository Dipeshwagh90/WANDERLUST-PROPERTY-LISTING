const mongoose = require('mongoose');
const User = require('../models/user');
const Listing = require('../models/listing');

// MongoDB connection URL from your environment
const ATLAS_DB_URL = "mongodb+srv://dipeshwagh888:dipesh123@cluster0.echvnio.mongodb.net/WanderLust?retryWrites=true&w=majority&appName=Cluster0";

async function checkAndFixDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(ATLAS_DB_URL);
        console.log("Database connected!");

        // 1. Check all users
        const users = await User.find({});
        console.log("\nUsers in database:", users.length);
        users.forEach(user => {
            console.log(`- User: ${user.username}, ID: ${user._id}`);
        });

        // 2. Check all listings
        const listings = await Listing.find({});
        console.log("\nListings in database:", listings.length);
        console.log("Sample listing owner IDs:");
        for(let i = 0; i < Math.min(3, listings.length); i++) {
            console.log(`- Listing "${listings[i].title}": owner = ${listings[i].owner}`);
        }

        // 3. If we have users but listings have wrong owner, fix them
        if(users.length > 0 && listings.length > 0) {
            const firstUser = users[0];
            console.log(`\nUpdating all listings to use owner: ${firstUser._id}`);
            
            const result = await Listing.updateMany(
                {}, 
                { $set: { owner: firstUser._id } }
            );
            console.log(`Updated ${result.modifiedCount} listings`);
        } else {
            console.log("\nError: Need at least one user and one listing to fix the database");
        }

    } catch (error) {
        console.error("\nError:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\nDatabase connection closed");
    }
}

// Run the check and fix
checkAndFixDatabase();