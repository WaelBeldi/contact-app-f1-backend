const express = require("express")
const connectDB = require("./config/connectDB")
require("dotenv").config({path: "./config/.env"})
const bodyParser = require('body-parser')
const cors = require("cors");


const app = express()
connectDB()
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())
app.use(cors(corsOptions))

//router
const contactRouter = require("./routes/contactRoutes")
const authRouter = require("./routes/authRoutes")

app.use("/api/contact", contactRouter)
app.use("/api/auth", authRouter)

app.use("/", (req, res) => {
  res.send("API is running")
})

const PORT = process.env.PORT || 5647

app.listen(PORT, (err) => {
  err ? console.log(err)
      : console.log(`Server running on port ${PORT}`)
})