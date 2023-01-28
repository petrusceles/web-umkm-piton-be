const authServices = require("../services/authServices");

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const { status, statusCode, message, data } =
    await authServices.userLoginService({ username, password });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const userProfile = async (req, res) => {
  const { username, id } = req.user;
  const { status, statusCode, message, data } =
    await authServices.userProfileService({ username, id });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

module.exports = { userLogin, userProfile };
