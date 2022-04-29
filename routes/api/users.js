const express = require('express')

const router = express.Router()
const  validation = require('../../middlewares/validation');
const ctrlWrapper = require('../../middlewares/ctrlWrapper')
const auth = require('../../middlewares/token')

const controller = require('../../controlers/usersCtrl')
const { joiSchema , subscriptionSchema} = require('../../models/userSchema')

router.post('/signup', validation(joiSchema), ctrlWrapper(controller.register))
router.post('/login', validation(joiSchema), ctrlWrapper(controller.login))
router.get('/logout', auth, ctrlWrapper(controller.logout))
router.get('/current', auth, ctrlWrapper(controller.getCurrentUser))
router.patch('/', auth, validation(subscriptionSchema), ctrlWrapper(controller.changeSubscription))
module.exports = router