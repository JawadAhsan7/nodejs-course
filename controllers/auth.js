const { BadRequestError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = await jwt.sign(
        { userId: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
    );
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
    res.send("login user");
};

module.exports = { register, login };
