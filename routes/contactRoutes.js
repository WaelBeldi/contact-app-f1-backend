const express = require("express")
const router = express.Router()
const controllers = require("../controllers/contactControllers")

//test routing
router.get("/hello", (req, res) => {
  res.send("Hello contact list")
})

//add contact
//method post
//path: http://localhost:5001/api/contact
router.post("/", controllers.postContact)

//get contacts
//method get
//path: http://localhost:5001/api/contact
router.get("/", controllers.getContacts)

//get one contact by id
//method get
//path: http://localhost:5001/api/contact/:id
router.get("/:id", controllers.getContactById)

//update one contact by id
//method put
//path: http://localhost:5001/api/contact/:id
router.put("/:id", controllers.updateContact)

//delete one contact by id
//method delete
//path: http://localhost:5001/api/contact/:id
router.delete("/:id", controllers.deleteContact)

module.exports = router