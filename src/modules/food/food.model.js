const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            default: "General"
        },
        available: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: String // Admin identifier (simulated)
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Food", foodSchema);