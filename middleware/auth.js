const { Users } = require("../models");

function isAlphanumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

const saveUser = async (req, res, next) => {
  try {
    const validUsername = isAlphanumeric(req.body.userName);
    if (!validUsername) {
      return res.status(409).send("username should be alphanumeric only");
    }

    const username = await Users.findOne({
      where: {
        username: req.body.userName,
      },
    });
    if (username) {
      return res.status(409).send("username already taken");
    }

    const emailcheck = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailcheck) {
      return res.status(409).send("Email already taken");
    }

    next();
  } catch (error) {
    return res.status(500).send("Server error: ", error);
  }
};

module.exports = {
  saveUser,
};
