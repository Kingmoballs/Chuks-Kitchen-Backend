const { z } = require("zod");

const createFoodSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Food name must be at least 2 characters"),
        description: z.string().min(5, "Description too short"),
        price: z.number().positive("Price must be greater than 0"),
        category: z.string().optional()
    })
});

module.exports = {
    createFoodSchema
};
