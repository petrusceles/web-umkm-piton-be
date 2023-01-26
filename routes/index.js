const companyRoutes = require("./companyRoutes");
const categoryRoutes = require("./categoryRoutes");
const routes = require("express").Router();

routes.use("/companies", companyRoutes);
routes.use("/categories", categoryRoutes);
module.exports = routes;
