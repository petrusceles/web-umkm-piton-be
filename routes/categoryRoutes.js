const express = require("express");
const routes = express.Router();
const CategoryController = require("../controllers/categoryControllers");
const FileEncoder = require("../middlewares/fileEncoder");
const FileUpload = require("../middlewares/fileUpload");

const authMiddlewares = require("../middlewares/authMiddlewares");
routes.post(
  "/",
  FileUpload.fileUpload,
  FileEncoder.fileEncoder,
  authMiddlewares.checkToken,
  CategoryController.createCategory
);
routes.get("/", CategoryController.readAllCategories);
routes.get("/:id", CategoryController.readCategoryById);
routes.put(
  "/:id",
  FileUpload.fileUpload,
  FileEncoder.fileEncoder,
  authMiddlewares.checkToken,
  CategoryController.updateCategoryById
);
routes.delete(
  "/:id",
  authMiddlewares.checkToken,
  CategoryController.deleteCategoryById
);
module.exports = routes;
