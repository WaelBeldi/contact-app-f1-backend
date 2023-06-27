const router = require("express").Router()
const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "../config/.env" })
const {registerRules, loginRules, validator} = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

router.get("/hello", (req, res) => {
  res.send("<h1>Hello auth</h1>")
})

// register user
// path: http://localhost:5001/api/auth/register
router.post("/register", registerRules(), validator, async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    //simple validation
    //check fields
    // if (!firstName || !lastName || !email || !password) {
    //   res.status(400).json({ msg: "Please enter all fields" })
    // }
    //check for existing user
    let user = await User.findOne({ email })
    if (user) {
      res.status(400).json({ msg: "User already exists" })
    }
    //create new user
    user = new User({ firstName, lastName, email, password })
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    user.password = hashedPassword
    //save user
    await user.save()
    //sign user
    const payload = { id: user.id }
    //token
    const token = await jwt.sign(payload, process.env.secretKey, { expiresIn: "1h" })
    //send response
    res.status(200).send({ msg: "User registred", user, token })
  } catch (error) {
    res.status(500).json({ msg: "Register server error" })
    console.log(error)
  }
})

// login user
// path: http://localhost:5001/api/auth/login
router.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body
  try {
    //simple validation
    //check fields
    // if (!email || !password) {
    //   res.status(400).json({ msg: "Please enter all fields" })
    // }
    //check user
    let user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ msg: "User does not exist" })
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({msg: "Bad credentials"})
    }
    //sign user
    const payload = { id: user.id }
    //token
    const token = await jwt.sign(payload, process.env.secretKey, { expiresIn: "1h" })
    //send response
    res.status(200).send({ msg: "User logged", user, token })
  } catch (error) {
    res.status(500).json({msg: "Login server error"})
    console.log(error)
  }
})

//private route
router.get("/user", isAuth, (req, res) => {
  res.status(200).send({user: req.user})
})

module.exports = router