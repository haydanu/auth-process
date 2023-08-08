const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Users } = require("../models");

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      username: userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    const user = await Users.create(data);

    if (user) {
      return res.status(201).send("User created, continue to login");
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    return res.status(500).send("Server error: ", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

        return res.status(201).send({ accessToken: token });
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    return res.status(500).send("Server error: ", error);
  }
};

module.exports = {
  signup,
  login,
};
