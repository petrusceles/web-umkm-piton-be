const companyRoutes = require("./companyRoutes");
const categoryRoutes = require("./categoryRoutes");
const authRoutes = require("./authRoutes");
const CompanyControllers = require("../controllers/companyControllers");
const routes = require("express").Router();

routes.use("/companies", companyRoutes);
routes.use("/categories", categoryRoutes);
routes.use("/auth", authRoutes);
routes.get("/percategories", CompanyControllers.readAllCompaniesPerCategory);
module.exports = routes;
