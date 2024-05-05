require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const connectDB = require("./db/connect");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`sERVER rUNNING oN pORT ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
