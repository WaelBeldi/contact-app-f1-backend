const express = require("express")
const connectDB = require("./config/connectDB")
require("dotenv").config({path: "./config/.env"})
const bodyParser = require('body-parser')

const app = express()
connectDB()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//router
const contactRouter = require("./routes/contactRoutes")
const authRouter = require("./routes/authRoutes")

app.use("/api/contact", contactRouter)
app.use("/api/auth", authRouter)

const PORT = process.env.PORT

app.listen(PORT, (err) => {
  err ? console.log(err)
      : console.log(`Server running on port ${PORT}`)
})