const express = require("express");
const routes = express.Router();
const authController = require("../controllers/authControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");
// const CategoryController = require("../controllers/categoryControllers");
routes.post("/login", authController.userLogin);
routes.get("/me", authMiddlewares.checkToken, authController.userProfile);
module.exports = routes;
