const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            sparse: true
        },
        phone: {
            type: String,
            unique: true,
            sparse: true
        },
        referralCode: {
            type: String,
            unique: true
        },
        referredBy: {
            type: String
        },
        role: {
            type: String,
            enum: ["CUSTOMER", "ADMIN"],
            default: "CUSTOMER"
        },
        status: {
            type: String,
            enum: ["PENDING_VERIFICATION", "ACTIVE"],
            default: "PENDING_VERIFICATION"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);