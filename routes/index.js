const companyRoutes = require("./companyRoutes");
const categoryRoutes = require("./categoryRoutes");
const CompanyControllers = require("../controllers/companyControllers");
const routes = require("express").Router();

routes.use("/companies", companyRoutes);
routes.use("/categories", categoryRoutes);
routes.get("/percategories", CompanyControllers.readAllCompaniesPerCategory);
module.exports = routes;
