const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-api-error");
const NotFound = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
    BadRequestError,
    CustomAPIError,
    UnauthenticatedError,
    NotFound,
};
