const jwt = require("jsonwebtoken")

const User = require("../models/userModel")

require("dotenv").config({path: "../config/.env"})

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"]
    //check for token
    if (!token) {
      res.status(400).send({msg: "No token. Unauthorized!"})
    }
    const decoded = await jwt.verify(token, process.env.secretKey)
    //get user by id from payload
    const user = await User.findById(decoded.id)
    //check user
    if (!user) {
      res.status(400).send({msg: "Unauthorized!"})
    }
    //get user
    req.user = user

    next()
  } catch (error) {
    res.status(500).send({msg: "Token is not valid"})
  }
}

module.exports = isAuth