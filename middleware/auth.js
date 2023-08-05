const db = require("../models");

const User = db.users;

function isAlphanumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

const saveUser = async (req, res, next) => {
  try {
    const validUsername = isAlphanumeric(req.body.userName);
    if (!validUsername) {
      return res.status(409).send("username should be alphanumeric only");
    }

    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (username) {
      return res.status(409).send("username already taken");
    }

    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailcheck) {
      return res.status(409).send("Authentication failed");
    }

    next();
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

module.exports = {
  saveUser
};
