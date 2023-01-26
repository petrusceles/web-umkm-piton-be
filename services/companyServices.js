const CompanyRepositories = require("../repositories/companyRepositories");
const { uploadToCloudinary } = require("../utils/cloudinaryUtils");
const CategoryRepositories = require("../repositories/categoryRepositories");
const createCompanyService = async ({
  category_id,
  name,
  owner,
  logo,
  picture,
  coordinate,
  instagram_link,
  wa_link,
  map_link,
  facebook_link,
  twitter_link,
  content,
}) => {
  try {
    if (
      !category_id ||
      !name ||
      !owner ||
      !logo ||
      !picture ||
      !coordinate ||
      !content ||
      !map_link
    ) {
      return {
        status: false,
        statusCode: 400,
        message:
          "all necessary fields (name, ower, logo, picture,coordinate,content, and map_link) must not be empty",
        data: {
          created_company: null,
        },
      };
    }

    const isCategoryExist = await CategoryRepositories.readCategoryById(
      category_id
    );

    if (!isCategoryExist) {
      return {
        status: false,
        statusCode: 400,
        message: "category doesn't exist",
        data: {
          created_company: null,
        },
      };
    }

    const isCompanyExist = await CompanyRepositories.readAllCompaniesByName(
      name
    );

    if (isCompanyExist.length) {
      return {
        status: false,
        statusCode: 400,
        message: "company already exist",
        data: {
          created_company: null,
        },
      };
    }

    const fileResponsePicture = picture
      ? await uploadToCloudinary(picture)
      : null;
    const fileResponseLogo = logo ? await uploadToCloudinary(logo) : null;
    // console.log(fileResponsePicture.url);
    const newCompany = await CompanyRepositories.createCompany({
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
      picture_url: fileResponsePicture ? fileResponsePicture.url : null,
      logo_url: fileResponseLogo ? fileResponseLogo.url : null,
    });

    return {
      status: true,
      statusCode: 201,
      message: "new company added",
      data: {
        created_company: newCompany,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        created_category: null,
      },
    };
  }
};

const readAllCompaniesService = async () => {
  try {
    const companies = await CompanyRepositories.readAllCompanies();
    if (!companies) {
      return {
        status: false,
        statusCode: 404,
        message: "no companies exist",
        data: {
          companies: null,
        },
      };
    }
    return {
      status: true,
      statusCode: 200,
      message: "all companies retrieved",
      data: {
        companies: companies,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        companies: null,
      },
    };
  }
};

const readCompanyByIdService = async (id) => {
  try {
    const company = await CompanyRepositories.readCompanyById(id);
    if (!company) {
      return {
        status: false,
        statusCode: 404,
        message: "company not found",
        data: {
          company: null,
        },
      };
    }
    return {
      status: true,
      statusCode: 200,
      message: "company found",
      data: {
        company,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        company: null,
      },
    };
  }
};

module.exports = {
  createCompanyService,
  readAllCompaniesService,
  readCompanyByIdService,
};
