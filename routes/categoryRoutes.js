const express = require("express");
const routes = express.Router();
const CategoryController = require("../controllers/categoryControllers");
const FileEncoder = require("../middlewares/fileEncoder");
const FileUpload = require("../middlewares/fileUpload");
routes.post(
  "/",
  FileUpload.fileUpload,
  FileEncoder.fileEncoder,
  CategoryController.createCategory
);
routes.get("/", CategoryController.readAllCategories);
routes.get("/:id", CategoryController.readCategoryById);
routes.put(
  "/:id",
  FileUpload.fileUpload,
  FileEncoder.fileEncoder,
  CategoryController.updateCategoryById
);
module.exports = routes;
