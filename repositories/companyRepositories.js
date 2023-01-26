const { Category, Company } = require("../db/models");

// category_id: DataTypes.BIGINT,
// name: DataTypes.STRING,
// owner: DataTypes.STRING,
// logo_url: DataTypes.STRING,
// picture_url: DataTypes.STRING,
// coordinate: DataTypes.STRING,
// instagram_link: DataTypes.STRING,
// wa_link: DataTypes.STRING,
// map_link: DataTypes.STRING,
// facebook_link: DataTypes.STRING,
// twitter_link: DataTypes.STRING,
// content: DataTypes.TEXT,
const createCompany = async ({
  category_id,
  name,
  owner,
  logo_url,
  picture_url,
  coordinate,
  instagram_link,
  wa_link,
  map_link,
  facebook_link,
  twitter_link,
  content,
}) => {
  const newCompany = await Company.create({
    category_id,
    name,
    owner,
    logo_url,
    picture_url,
    coordinate,
    instagram_link,
    wa_link,
    map_link,
    facebook_link,
    twitter_link,
    content,
  });
  return newCompany;
};

const readAllCompaniesPerCategory = async () => {
  const categories = await Category.findAll({
    include: [
      {
        model: Company,
        as: "companies",
      },
    ],
  });
  return categories;
};

const readAllCompanies = async () => {
  const companies = await Company.findAll({
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
    order: [
      ["category_id", "ASC"],
      ["name", "ASC"],
    ],
  });
  return companies;
};

const readAllCompaniesByName = async (name) => {
  const companies = await Company.findAll({
    where: {
      name,
    },
  });
  return companies;
};

const readCompanyById = async (id) => {
  const company = await Company.findByPk(id);
  return company;
};

const updateCompanyById = async (
  id,
  {
    category_id,
    name,
    owner,
    logo_url,
    picture_url,
    coordinate,
    instagram_link,
    wa_link,
    map_link,
    facebook_link,
    twitter_link,
    content,
  }
) => {
  const updatedCompany = await Company.update(
    {
      category_id,
      name,
      owner,
      logo_url,
      picture_url,
      coordinate,
      instagram_link,
      wa_link,
      map_link,
      facebook_link,
      twitter_link,
      content,
    },
    {
      where: {
        id,
      },
    }
  );

  return updatedCompany;
};

const deleteCompanyById = async (id) => {
  const deletedCompany = await Company.destroy({
    where: {
      id,
    },
  });
  return deletedCompany;
};

module.exports = {
  createCompany,
  readAllCompanies,
  readAllCompaniesByName,
  readAllCompaniesPerCategory,
  readCompanyById,
  updateCompanyById,
  deleteCompanyById,
};
