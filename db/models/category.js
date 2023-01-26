"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Company, {
        foreignKey: "category_id",
        as: "companies",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      picture_url: DataTypes.STRING,
      icon_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
