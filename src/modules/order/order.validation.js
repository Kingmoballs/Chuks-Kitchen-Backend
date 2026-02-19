const { z } = require("zod");

const createOrderSchema = z.object({
    body: z.object({
        userId: z.string().min(1, "User ID is required"),
        items: z.array(
            z.object({
                foodId: z.string(),
                quantity: z.number().int().positive()
            })
        ).min(1, "Cart cannot be empty")
    })
});

module.exports = {
    createOrderSchema
};