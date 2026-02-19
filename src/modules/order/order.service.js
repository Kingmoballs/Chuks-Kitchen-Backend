const ApiError = require("../../shared/utils/ApiError");
const orderRepo = require("./order.repository");
const foodRepo = require("../food/food.repository");

exports.createOrder = async (payload) => {
    const { userId, items } = payload;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
        const food = await foodRepo.getFoodById(item.foodId);

        if (!food) {
            throw new ApiError(404, "Food item not found")
        }

        if (!food.available) {
            throw new ApiError(
                400,
                `Food item "${food.name}" is not available `
            );
        }

        const itemTotal = food.price * item.quantity;
        totalAmount += itemTotal;

        orderItems.push({
            foodId: food._id,
            name: food.name,
            quantity: item.quantity,
            priceSnapshot: food.price
        });
    }

    const order = await orderRepo.createOrder({
        userId,
        items: orderItems,
        totalAmount
    });

    return order; 
}

exports.getOrderById = async (id) => {
    const order = await orderRepo.findById(id);

    if (!order) {
        throw new ApiError(404, "Order not found")
    }

    return order;
}
