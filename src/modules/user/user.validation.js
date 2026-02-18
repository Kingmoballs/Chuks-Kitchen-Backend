const { z } = require("zod");

const signupSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email format").optional(),
        phone: z.string().min(7, "Invalid phone number").optional(),
        referralCode: z.string().optional()
    }).refine(
        (data) => data.email || data.phone,
        {
            message: "Email or phone is required",
            path: ["email"]
        }
    )
    });

    const verifySchema = z.object({
    body: z.object({
        userId: z.string().min(1, "User ID is required"),
        code: z.string().length(6, "OTP must be 6 digits")
    })
});

module.exports = {
    signupSchema,
    verifySchema
};
