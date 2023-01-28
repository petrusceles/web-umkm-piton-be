const { Category } = require("../db/models");

const readAllCategoriesByName = async (name) => {
  const categories = await Category.findAll({
    where: {
      name,
    },
  });
  return categories;
};

const createCategory = async ({ name, picture_url, icon_url }) => {
  const newCategory = await Category.create({
    name,
    picture_url,
    icon_url,
  });
  return newCategory;
};

const readAllCategories = async () => {
  const categories = await Category.findAll({
    order: [["name", "ASC"]],
  });
  return categories;
};

const readCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  return category;
};

const updateCategoryById = async (id, { name, picture_url, icon_url }) => {
  const updatedCategory = await Category.update(
    {
      name,
      picture_url,
      icon_url,
    },
    {
      where: {
        id,
      },
    }
  );
  return updatedCategory;
};

const deleteCategoryById = async (id) => {
  const deletedCategory = await Category.destroy({
    where: {
      id,
    },
  });
  return deletedCategory;
};

module.exports = {
  readAllCategoriesByName,
  createCategory,
  readAllCategories,
  readCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
