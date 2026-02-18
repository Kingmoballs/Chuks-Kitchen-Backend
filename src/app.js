const express = require("express");
const errorHandler = require("./shared/middlewares/errorHandler");

// Routes Files
const userRoutes = require("./modules/user/user.routes");

const app = express();

app.use(express.json());

//Routes
app.get("/", (req, res) => {
    res.json({ message: "Chucks Kitchen API running" })
});
app.use("/api/users", userRoutes);

// Global Error Handler 
app.use(errorHandler);

module.exports = app;