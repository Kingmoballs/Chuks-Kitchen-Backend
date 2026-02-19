const express = require("express");
const errorHandler = require("./shared/middlewares/errorHandler");

// Routes Files
const userRoutes = require("./modules/user/user.routes");
const foodRoutes = require("./modules/food/food.routes");
const orderRoutes = require("./modules/order/order.routes");

const app = express();

app.use(express.json());

//Routes
app.get("/", (req, res) => {
    res.json({ message: "Chucks Kitchen API running" })
});
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// Global Error Handler 
app.use(errorHandler);

module.exports = app;