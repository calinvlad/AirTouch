const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");
const config = require("./config");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username: username
        }
      });
      const isPasswordValid = await user.comparePassword(password);
      if (!user || !isPasswordValid) {
        res.status(403).send({
          error: "Your account data is incorrect"
        });
      }
      const userJson = user.toJSON();

      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
  async register(req, res) {
    try {
      const { username, email, password, first_name, last_name } = req.body;
      const role = "User";
      console.table({ username, email, password, first_name, last_name });
      const user = await User.create({
        username: username,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        role: role
      });
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
};
