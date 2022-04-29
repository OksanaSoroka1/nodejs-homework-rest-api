const { User } = require('../models/userSchema')
const { Unauthorized } = require("http-errors");
const {SEKRET_KEY} = process.env;

const jwt = require("jsonwebtoken");

const auth = async(req, res,next) => {
   const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized("Not authorized")
            
        }
        const { id } = jwt.verify(token, SEKRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw new Unauthorized("Not authorized");
        }
        req.user = user;
        next();
    } catch (error) {
        if(error.message === "Invalid sugnature"){
            error.status = 401;
        }
        next(error);
    } 
}
module.exports = auth