const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");
const validate = require("../../shared/middlewares/validate");
const { createOrderSchema } = require("./order.validation");

router.post(
    "/",
    validate(createOrderSchema),
    orderController.createOrder
);

router.get("/:id", orderController.getOrder);

module.exports = router;
