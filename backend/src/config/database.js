import mongoose from "mongoose";

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connected to MongoDB");
        })
        .catch((err) => {
            console.log("Error connecting to DB", err);
        });
}

export default connectDB;