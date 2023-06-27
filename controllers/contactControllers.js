const Contact = require("../models/contactModel")

exports.postContact = async (req, res) => {
  try {
    //create a new contact
    const newContact = new Contact(req.body)
    //test if contact has a name
    if (!req.body.name) {
      res.status(400).send({ message: "name is required" })
      return;
    }
    //test if contact has an email
    if (!req.body.email) {
      res.status(400).send({ message: "email is required" })
      return;
    }
    //test if email exist
    const contact = await Contact.findOne({ email: req.body.email })
    if (contact) {
      res.status(400).send({ message: "Contact already exists, email should be unique" })
      return
    }
    //save contact
    const result = await newContact.save()
    res.status(200).send({ message: "contact added", response: result })
  } catch (error) {
    res.status(500).send({ message: "cannot save contact" })
    console.log(error)
  }
}

exports.getContacts = async (req, res) => {
  try {
    const result = await Contact.find()
    res.status(200).send({ message: "Getting contacts successfully", response: result })
  } catch (error) {
    res.status(200).send({ message: "Can not get contacts" })
  }
}

exports.getContactById = async (req, res) => {
  try {
    const result = await Contact.findOne({ _id: req.params.id })
    if(result){
      res.status(200).send({ message: "Getting one contact successfully", response: result })
    } else {
      res.status(200).send({ message: "No contact with this id" })
    }
  } catch (error) {
    res.status(200).send({ message: "Can not get contact" })
  }
}

exports.updateContact = async (req, res) => {
  try {
    const result = await Contact.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
    if (result) {
      const newResult = await Contact.findOne({ _id: req.params.id })
      res.status(200).send({ message: "Update one contact successfully", response: newResult })
    }
  } catch (error) {
    res.status(200).send({ message: "Can not update contact" })
  }
}

exports.deleteContact = async (req, res) => {
  try {
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).send({ message: "Delete one contact successfully" })
  } catch (error) {
    res.status(200).send({ message: "Can not delete contact" })
  }
}