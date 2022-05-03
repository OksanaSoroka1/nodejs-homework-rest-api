const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema({
    password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true })


const joiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
  token: Joi.string(),
  avatarURL: Joi.string(),
  verify: Joi.bool(),
    verificationToken: Joi.string()

})
const subscriptionSchema = Joi.object({
   subscription: Joi.string().required(),
})
const verifyingEmailSchema = Joi.object({
  email: Joi.string().required()
})
const User = model('user', userSchema)

module.exports = {User,  joiSchema, subscriptionSchema, verifyingEmailSchema}