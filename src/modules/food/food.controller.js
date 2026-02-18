const foodService = require("./food.service");

exports.createFood = async (req, res, next) => {
    try{
        const role = req.headers["x-role"];
        const result = await foodService.addFood(
            req.validated.body,
            role
        );

        res.status(201).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
}

exports.getFoods = async (req, res, next) => {
    try{
        const role = req.headers["x-role"];
        const result = await foodService.getFoods(role);

        res.json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
}