const { User} = require('../models/userSchema')
const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SEKRET_KEY } = process.env
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp');

const register = async (req,res) => { 
    const { password, email } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        throw new Conflict(`User with such email already exist`)
    }
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const avatarURL = gravatar.url(email)
   await User.create({ email, password: hashPassword , avatarURL})
res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
              avatarURL
            }
        }
    })
}

const login = async (req, res) => { 
     const { password, email } = req.body;
    const user = await User.findOne({ email })
    
    if (!user ) {
        throw new Unauthorized(`Email  is wrong`)
    }
    const comparePass = bcrypt.compareSync(password, user.password)
     if ( !comparePass) {
        throw new Unauthorized(`password is wrong`)
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: "2h" })
   await User.findByIdAndUpdate(user._id, {token});
    res.status(201).json({
         status: "success",
        code: 201,
        data: {
            user: {
                email,
                token
            }
        }
    })
}

const getCurrentUser = async (req, res) => {

    const {token, email }=req.user
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                email,
                token
            }
        }
    })
}

const logout = async (req, res) => { 
const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: null});
    res.status(204).json();
}

const changeSubscription = async (req, res) => { 
    const { _id } = req.user;
     const {  subscription } = req.body;
   const result = await User.findByIdAndUpdate(_id, { subscription }, {new:true});
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
}

const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file
    const {_id: id} = req.user;
    const imageName = `${id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, imageName)
    
try {   
  await Jimp.read(tempUpload)
      .then(image => {
    return image
      .resize(250, 250) 
      .write(resultUpload);
  })
  .catch(err => {
    throw err
  });
        /* await fs.rename(tempUpload, resultUpload); */
        const avatarURL = path.join("public", "avatars", imageName);
        await User.findByIdAndUpdate(req.user._id, {avatarURL});
   
     res.status(201).json({
      status: "success",
      code: 201,
      data: {
        avatarURL
      }
    })
} catch (error) {
    await fs.unlink(tempUpload);
        throw error;
}
 }
module.exports = { register, login, getCurrentUser, logout , changeSubscription, updateAvatar}
