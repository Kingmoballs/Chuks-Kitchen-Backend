const Food = require("./food.model");

exports.createFood = async (data) => {
    return Food.create(data);
}

exports.getAvailableFoods = async () => {
    return Food.find({ available: true });
}

exports.getAllFoods = async () => {
    return Food.find();
}