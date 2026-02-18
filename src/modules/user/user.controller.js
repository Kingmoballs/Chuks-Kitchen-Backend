const userService = require("./user.service");

exports.signup = async (req, res, next) => {
  try {
    const result = await userService.signup(req.validated.body);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const result = await userService.verifyUser(req.validated.body);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
