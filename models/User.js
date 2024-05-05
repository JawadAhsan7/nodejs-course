const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
    );
};

module.exports = mongoose.model("User", UserSchema);
