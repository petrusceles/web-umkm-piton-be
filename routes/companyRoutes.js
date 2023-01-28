const express = require("express");
const routes = express.Router();
const CompanyControllers = require("../controllers/companyControllers");
const FileEncoder = require("../middlewares/fileEncoder");
const FileUpload = require("../middlewares/fileUpload");

const authMiddlewares = require("../middlewares/authMiddlewares");
routes.get("/", CompanyControllers.readAllCompanies);
routes.post(
  "/",
  FileUpload.fileUpload,
  FileEncoder.fileEncoder,
  authMiddlewares.checkToken,
  CompanyControllers.createCompany
);
routes.get("/:id", CompanyControllers.readCompanyById);
routes.put(
  "/:id",
  FileUpload.fileUpload,
  FileEncoder.fileEncoder,
  authMiddlewares.checkToken,
  CompanyControllers.updateCompanyById
);
routes.delete(
  "/:id",
  authMiddlewares.checkToken,
  CompanyControllers.deleteCompanyById
);
module.exports = routes;
