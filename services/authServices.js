const authRepositories = require("../repositories/authRepositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userLoginService = async ({ username, password }) => {
  try {
    if (!username || !password) {
      return {
        status: false,
        statusCode: 400,
        message: "all fields (username, password) must not be empty",
        data: {
          logged_user: null,
        },
      };
    }

    const userExist = await authRepositories.findUserByUsername(username);

    if (!userExist) {
      return {
        status: false,
        statusCode: 404,
        message: "user not found",
        data: {
          logged_user: null,
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return {
        status: false,
        statusCode: 401,
        message: "password incorrect",
        data: {
          logged_user: null,
        },
      };
    }

    const userPayload = {
      username,
      id: userExist.id,
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_VALIDITY_PERIOD,
    });

    return {
      status: true,
      statusCode: 200,
      message: "user logged in",
      data: {
        logged_user: {
          id: userExist.id,
          username: userExist.username,
        },
        token,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        logged_user: null,
      },
    };
  }
};

const userProfileService = async ({ username, id }) => {
  try {
    const user = await authRepositories.findUserByUsernameAndId({
      username,
      id,
    });
    if (!user) {
      return {
        status: false,
        statusCode: 401,
        message: String(err),
        data: {
          user: null,
        },
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: "user successfully retrieved",
      data: {
        user,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: String(err),
      data: {
        logged_user: null,
      },
    };
  }
};
module.exports = { userLoginService, userProfileService };
