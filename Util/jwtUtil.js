const jwt = require('jsonwebtoken');

exports.generateToken = (id,email)=>{
    return jwt.sign({id:id,email:email}, process.env.JWT_SECRET, {expiresIn: "7d"});
    
}