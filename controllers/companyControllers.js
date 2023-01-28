const { Category, Company } = require("../db/models");
const CompanyService = require("../services/companyServices");

const createCompany = async (req, res) => {
  const {
    category_id,
    name,
    owner,
    coordinate,
    instagram_link,
    wa_link,
    map_link,
    facebook_link,
    twitter_link,
    content,
  } = req.body;

  const picture = req.picture;
  const logo = req.logo;
  const { status, statusCode, message, data } =
    await CompanyService.createCompanyService({
      category_id,
      name,
      owner,
      coordinate,
      instagram_link,
      wa_link,
      map_link,
      facebook_link,
      twitter_link,
      content,
      picture,
      logo,
    });

  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const readAllCompanies = async (req, res) => {
  const { status, statusCode, message, data } =
    await CompanyService.readAllCompaniesService();
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const readCompanyById = async (req, res) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await CompanyService.readCompanyByIdService(id);
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const deleteCompanyById = async (req, res) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await CompanyService.deleteCompanyService(id);
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const updateCompanyById = async (req, res) => {
  const {
    category_id,
    name,
    owner,
    coordinate,
    instagram_link,
    wa_link,
    map_link,
    facebook_link,
    twitter_link,
    content,
  } = req.body;

  const picture = req.picture;
  const logo = req.logo;
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await CompanyService.updateCompanyService(id, {
      category_id,
      name,
      owner,
      coordinate,
      instagram_link,
      wa_link,
      map_link,
      facebook_link,
      twitter_link,
      content,
      picture,
      logo,
    });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const readAllCompaniesPerCategory = async (req, res) => {
  const { status, statusCode, message, data } =
    await CompanyService.readAllCompaniesPerCategoryService();
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};
module.exports = {
  readAllCompanies,
  createCompany,
  readCompanyById,
  deleteCompanyById,
  updateCompanyById,
  readAllCompaniesPerCategory,
};
