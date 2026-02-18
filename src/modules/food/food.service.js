const foodRepo = require("./food.repository");
const ApiError = require("../../shared/utils/ApiError");

exports.addFood = async (payload, role) => {
    if (role !== "ADMIN") {
        throw new ApiError(403, "Only admin can add food")
    }

    const food = await foodRepo.createFood({
        ...payload,
        createdBy: "ADMIN"
    });

    return food;
}

exports.getFoods = async (role) => {
    if (role === "ADMIN") {
        return foodRepo.getAllFoods();
    }

    return foodRepo.getAvailableFoods();
}
