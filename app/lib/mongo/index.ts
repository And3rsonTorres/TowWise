import mongoose from "mongoose";


// Retrieve and validate the MongoDB URI
const URI = process.env.TOWING_URI;
const options ={};

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
    } catch (error) {
        console.log(error);
    }
};

export default ConnectDB;
