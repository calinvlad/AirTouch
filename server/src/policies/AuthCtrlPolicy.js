const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = {
      username: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
      first_name: Joi.string(),
      last_name: Joi.string()
    };

    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "username":
          res.status(400).send({
            error: "Your username is already registered"
          });
        case "email":
          res.status(400).send({
            error: "You must provide a valid email adress"
          });
          break;
        case "password":
          res.status(400).send({
            error: `Your password must be between 8 and 32 characters.`
          });
        default:
          res.status(400).send({
            error: "Invalid registration information"
          });
      }
    } else {
      next();
    }
  }
};
