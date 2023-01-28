const { User } = require("../db/models");

const findUserByUsername = async (username) => {
  // console.log(User);
  const user = await User.findOne({
    where: {
      username,
    },
  });
  // console.log(user);
  return user;
};

const findUserByUsernameAndId = async ({ username, id }) => {
  const user = await User.findOne({
    where: {
      username,
      id,
    },
    attributes: { exclude: ["password"] },
  });
  return user;
};

module.exports = { findUserByUsername, findUserByUsernameAndId };
