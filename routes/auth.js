const express = require("express");
const { login, register } = require("../controllers/auth");
const checkUserExistanceMiddleware = require("../middlewares/user-exists");
const router = express.Router();

router.post("/login", login);
router.post("/register", checkUserExistanceMiddleware, register);

module.exports = router;
