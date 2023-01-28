const CategoryRepositories = require("../repositories/categoryRepositories");
const { uploadToCloudinary } = require("../utils/cloudinaryUtils");

const createCategoryService = async ({ name, picture, icon }) => {
  try {
    if (!name || !picture || !icon) {
      //   console.log("MASUK");
      return {
        status: false,
        statusCode: 400,
        message: "all fields (name, picture) must not be empty",
        data: {
          created_category: null,
        },
      };
    }
    // console.log("Masuk?");

    const isCategoryExist = await CategoryRepositories.readAllCategoriesByName(
      name
    );

    if (isCategoryExist.length) {
      return {
        status: false,
        statusCode: 400,
        message: "category already exist",
        data: {
          created_category: null,
        },
      };
    }

    // console.log(picture);

    const fileResponsePicture = picture
      ? await uploadToCloudinary(picture)
      : null;
    const fileResponseIcon = icon ? await uploadToCloudinary(icon) : null;
    console.log(fileResponseIcon.url);
    const newCategory = await CategoryRepositories.createCategory({
      name,
      picture_url: fileResponsePicture ? fileResponsePicture.url : null,
      icon_url: fileResponseIcon ? fileResponseIcon.url : null,
    });

    return {
      status: true,
      statusCode: 201,
      message: "new category added",
      data: {
        created_category: newCategory,
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

const readAllCategoriesService = async () => {
  try {
    const categories = await CategoryRepositories.readAllCategories();
    if (!categories) {
      return {
        status: false,
        statusCode: 404,
        message: "no categories exist",
        data: {
          categories: null,
        },
      };
    }
    return {
      status: true,
      statusCode: 200,
      message: "all categories retrieved",
      data: {
        categories: categories,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        categories: null,
      },
    };
  }
};

const readCategoryByIdService = async ({ id }) => {
  try {
    const category = await CategoryRepositories.readCategoryById(id);
    if (!category) {
      return {
        status: false,
        statusCode: 404,
        message: "category not found",
        data: {
          category: null,
        },
      };
    }
    return {
      status: true,
      statusCode: 200,
      message: "category found",
      data: {
        category,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        category: null,
      },
    };
  }
};

const updateCategoryService = async (id, { name, picture, icon }) => {
  try {
    const category = await CategoryRepositories.readCategoryById(id);
    if (!category) {
      return {
        status: false,
        statusCode: 404,
        message: "category not found",
        data: {
          updated_category: null,
        },
      };
    }

    if (!name && !picture && !icon) {
      return {
        status: false,
        statusCode: 400,
        message: "no data updated",
        data: {
          updated_category: null,
        },
      };
    }

    let isCategoryExist = await CategoryRepositories.readAllCategoriesByName(
      name
    );
    isCategoryExist = isCategoryExist.filter((e, i) => {
      return e.name != name;
    });
    if (isCategoryExist.length) {
      return {
        status: false,
        statusCode: 400,
        message: "category already exist",
        data: {
          updated_category: null,
        },
      };
    }

    const fileResponsePicture = picture
      ? await uploadToCloudinary(picture)
      : null;
    const fileResponseIcon = icon ? await uploadToCloudinary(icon) : null;
    // console.log(fileResponsePicture.url);
    const updatedCategory = await CategoryRepositories.updateCategoryById(id, {
      name,
      picture_url: fileResponsePicture ? fileResponsePicture.url : undefined,
      icon_url: fileResponseIcon ? fileResponseIcon.url : undefined,
    });

    return {
      status: true,
      statusCode: 200,
      message: "category updated",
      data: {
        updated_category: updatedCategory,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        updated_category: null,
      },
    };
  }
};

const deleteCategoryByIdService = async (id) => {
  try {
    const isCategoryExist = await CategoryRepositories.readCategoryById(id);
    if (!isCategoryExist) {
      return {
        status: false,
        statusCode: 404,
        message: "category doesn't exist",
        data: {
          deleted_category: null,
        },
      };
    }
    const deletedCategory = await CategoryRepositories.deleteCategoryById(id);
    return {
      status: true,
      statusCode: 200,
      message: "category deleted",
      data: {
        deleted_company: deletedCategory,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        deleted_category: null,
      },
    };
  }
};

module.exports = {
  createCategoryService,
  readAllCategoriesService,
  readCategoryByIdService,
  updateCategoryService,
  deleteCategoryByIdService,
};
