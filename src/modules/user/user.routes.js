const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const validate = require("../../shared/middlewares/validate");
const {
    signupSchema,
    verifySchema
} = require("./user.validation");

router.post(
    "/signup",
    validate(signupSchema),
    userController.signup
);

router.post(
    "/verify",
    validate(verifySchema),
    userController.verify
);

module.exports = router;
