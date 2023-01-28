const CategoryService = require("../services/categoryServices");

const createCategory = async (req, res) => {
  const { name } = req.body;
  const picture = req.picture;
  const icon = req.icon;
  const { status, statusCode, message, data } =
    await CategoryService.createCategoryService({ name, picture, icon });
  // console.log(status);
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const readAllCategories = async (req, res) => {
  const { status, statusCode, message, data } =
    await CategoryService.readAllCategoriesService();
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const readCategoryById = async (req, res) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await CategoryService.readCategoryByIdService({ id });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const updateCategoryById = async (req, res) => {
  const { name } = req.body;
  // console.log(req)
  // console.log(name);
  const picture = req.picture;
  const icon = req.icon;
  const { id } = req.params;
  // console.log("masuk");
  const { status, statusCode, message, data } =
    await CategoryService.updateCategoryService(id, { name, picture, icon });
  // console.log(status);
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await CategoryService.deleteCategoryByIdService(id);
  // console.log(status);
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

module.exports = {
  createCategory,
  readAllCategories,
  readCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
