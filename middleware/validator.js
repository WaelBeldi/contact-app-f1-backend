const { body, validationResult } = require("express-validator")

const registerRules = () => [
  body("firstName", "Firstname is required").notEmpty(),
  body("lastName", "Lastname is required").notEmpty(),
  body("email", "Email should be an email").isEmail(),
  body("password", "Password should be at least 6 characters").isLength({
    min: 6,
    max: 15
  }),
]

const loginRules = () => [
  body("email", "Email should be an email").isEmail(),
  body("password", "Password should be at least 6 characters").isLength({
    min: 6,
    max: 15
  }),
]

const validator = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({errors: errors.array()})
  }
  next()
}

module.exports = {registerRules, loginRules, validator}