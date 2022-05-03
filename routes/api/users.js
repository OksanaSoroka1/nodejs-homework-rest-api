const express = require('express')

const router = express.Router()
const  validation = require('../../middlewares/validation');
const ctrlWrapper = require('../../middlewares/ctrlWrapper')
const auth = require('../../middlewares/token')
const upload = require('../../middlewares/upload')
const controller = require('../../controlers/usersCtrl')
const { joiSchema , subscriptionSchema, verifyingEmailSchema} = require('../../models/userSchema')

router.post('/signup', validation(joiSchema), ctrlWrapper(controller.register))
router.post('/login', validation(joiSchema), ctrlWrapper(controller.login))
router.get('/logout', auth, ctrlWrapper(controller.logout))
router.get('/current', auth, ctrlWrapper(controller.getCurrentUser))
router.patch('/', auth, validation(subscriptionSchema), ctrlWrapper(controller.changeSubscription))
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(controller.updateAvatar))
router.get("/verify/:verificationToken", ctrlWrapper(controller.verifyEmail));
router.post('/verify', validation(verifyingEmailSchema), ctrlWrapper(controller.repeatVerifyEmail))
module.exports = router