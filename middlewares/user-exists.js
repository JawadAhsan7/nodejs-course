const { BadRequestError } = require("../errors");
const User = require("../models/User");

const checkUserExistanceMiddleware = async (req, res, next) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
        throw new BadRequestError("User creation failed: email already exists");

    next();
};

module.exports = checkUserExistanceMiddleware;