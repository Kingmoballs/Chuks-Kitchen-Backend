const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        req.validated = result;
        next();
    } catch (error) {
        if (error.issues) {
            return next(
                new ApiError(
                    400,
                    error.issues[0]?.message || "Invalid request data"
                )
            );
        }

        next(error);
    }
};

module.exports = validate;
