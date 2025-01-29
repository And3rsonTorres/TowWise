/**
 * Connects to the MongoDB database using the provided URI.
 * If the connection is already established, it logs a message indicating that MongoDB is already connected.
 * If an error occurs during the connection, it attempts to reconnect to the database.
 */
import mongoose from "mongoose";

// Retrieve and validate the MongoDB URI
const URI = process.env.TOWING_URI;
const options = {};

if (!URI) {
  throw new Error("Add MongoDB URI to .env file");
}
let isConnected: boolean = false;

const ConnectDB = async () => {
  try {
    if (!isConnected) {
      await mongoose.connect(URI, options);
      isConnected = true;
      console.log("MongoDB Connected");
    } else {
      console.log("MongoDB is already connected");
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === 500) {
      // Restart connection
      await mongoose.disconnect();
      await mongoose.connect(URI, options);
      isConnected = true;
      console.log("MongoDB reconnected");
    }
  }
};

export default ConnectDB;
