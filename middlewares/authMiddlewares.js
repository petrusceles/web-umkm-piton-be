const jwt = require("jsonwebtoken");
const authRepositories = require("../repositories/authRepositories");
const checkToken = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    console.log(bearer);

    if (!bearer) {
      return res.status(401).json({
        status: false,
        message: "no bearer provided",
        data: null,
      });
    }
    const token = bearer.split(" ")[1];
    const { username, id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = authRepositories.findUserByUsernameAndId({ username, id });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "invalid credentials",
        data: null,
      });
    }
    req.user = { username, id };

    next();
  } catch (err) {
    console.log(err);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: false,
        message: err,
        data: null,
      });
    }
    return res.status(500).json({
      status: false,
      message: err,
      data: null,
    });
  }
};

// const superAdminAuth = (req, res, next) => {
//   if (req.user.roleId !== ROLES.SUPER_ADMIN) {
//     return res.status(401).json({
//       status: "UNAUTHORIZED",
//       message: "only super admin can access",
//       data: null,
//     });
//   }
//   next();
// };

// const adminAuth = (req, res, next) => {
//   if (
//     req.user.roleId !== ROLES.ADMIN &&
//     req.user.roleId !== ROLES.SUPER_ADMIN
//   ) {
//     return res.status(401).json({
//       status: "UNAUTHORIZED",
//       message: "only admin or superadmin can access",
//       data: null,
//     });
//   }
//   next();
// };

module.exports = {
  checkToken,
};
