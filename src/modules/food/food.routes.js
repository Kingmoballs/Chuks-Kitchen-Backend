const express = require("express");
const router = express.Router();
const foodController = require("./food.controller");
const validate = require("../../shared/middlewares/validate");
const { createFoodSchema } = require("./food.validation");

router.get("/", foodController.getFoods);

router.post(
    "/",
    validate(createFoodSchema),
    foodController.createFood
);

module.exports = router;
