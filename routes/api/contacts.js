const express = require('express')

const router = express.Router()
const  validation = require('../../middlewares/validation');
const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const auth = require('../../middlewares/token')

const controller = require('../../controlers/contactsControllers')
const { joiSchema , favoriteJoiSchema} = require('../../models/contactsSchema')

router.get('/', auth, ctrlWrapper(controller.listContacts))

router.get('/:contactId', ctrlWrapper(controller.getContactById))

router.post('/', auth, validation(joiSchema), ctrlWrapper(controller.addContact))

router.delete('/:contactId', ctrlWrapper(controller.removeContact))

router.put('/:contactId',validation(joiSchema), ctrlWrapper(controller.updateContact))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(controller.updateFavoriteContact))

module.exports = router
