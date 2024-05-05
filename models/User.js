const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
});

module.exports = mongoose.model("User", UserSchema);
