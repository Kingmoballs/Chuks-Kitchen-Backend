const orderService = require("./order.service");

exports.createOrder = async (req, res, next) => {
    try {
        const result = await orderService.createOrder(req.validated.body);

        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error)
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const result = await orderService.getOrderById(req.params.id);

        res.json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error)
    }
}