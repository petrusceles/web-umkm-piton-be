const express = require("express");
const routes = express.Router();
const CompanyControllers = require("../controllers/companyControllers");
const FileEncoder = require("../middlewares/fileEncoder");
const FileUpload = require("../middlewares/fileUpload");

routes.get("/", CompanyControllers.readAllCompanies);
routes.post(
  "/",
  FileUpload.fileUpload,
  FileEncoder.fileEncoder,
  CompanyControllers.createCompany
);
routes.get("/:id", CompanyControllers.readCompanyById);
module.exports = routes;
