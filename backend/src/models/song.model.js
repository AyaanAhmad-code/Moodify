import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: {
            values: ["neutral", "sad", "happy", "surprised"],
            message: "{VALUE} is not a supported mood" // Optional: adds a nice custom error message
        }
    }
});

const SongModel = mongoose.model("Song", songSchema);

export default SongModel;