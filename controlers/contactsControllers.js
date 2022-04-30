const { Contact} = require('../models/contactsSchema')
const createError = require('http-errors')

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
  const {favorite} = req.query
  const result = await Contact.find({ owner: _id , favorite}, "", { skip, limit: Number(limit) }).populate("owner", "_id name email")
  
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}


const getContactById = async (req, res) => {
  const { contactId } = req.params
    const contactById = await Contact.findById(contactId)
    if (!contactById) {
      throw createError(404, `Contact with id: ${contactId} not found `)
   
     }
    res.json({
      status: "success",
      code: 200, 
      data: {
        result: contactById
      }
    })
}

const removeContact = async (req, res) => {
 const { contactId } = req.params;
   const result = await Contact.findByIdAndRemove(contactId)
   if (!result) { throw createError(404, `Contact with id: ${contactId} not found `) }
   res.json({
     status: "success",
     code: 200, 
       message: "contact deleted",
      data: {
        result
      }
   })
}

const addContact = async (req, res) => {
  const { _id} = req.user
  const result = await Contact.create({...req.body, owner: _id})
     
    res.status(201).json({
      status: "success",
      code: 201, 
      data: {
        result
      }
    })
}

const updateContact = async (req, res) => { 
  const { contactId } = req.params;
   
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true})
    if (!result) {
      throw createError(404, `Contact with id: ${contactId} not found `)
   
     }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
}

const updateFavoriteContact = async (req, res) => { 
    const { contactId } = req.params;
     const {  favorite } = req.body;
  
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new:true})
    if (!result) {
      throw createError(404, `Contact with id: ${contactId} not found `)
   
     }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
    updateContact,
  updateFavoriteContact,
  
}