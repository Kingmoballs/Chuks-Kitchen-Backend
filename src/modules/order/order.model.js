const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    name: String,
    quantity: Number,
    priceSnapshot: Number
})

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [orderItemSchema],
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: [
                "PENDING",
                "CONFIRMED",
                "PREPARING",
                "OUT_FOR_DELIVERY",
                "COMPLETED",
                "CANCELLED"
            ],
            default: "PENDING"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);