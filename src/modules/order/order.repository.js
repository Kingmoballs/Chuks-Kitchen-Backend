const Order = require("./order.model");

exports.createOrder = async (data) => {
    return Order.create(data);
}

exports.findById = async (id) => {
    return Order.findById(id);
}