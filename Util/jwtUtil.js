const jwt = require('jsonwebtoken');

exports.generateToken = (id,email,admin)=>{
    return jwt.sign({id:id,email:email,admin:admin}, process.env.JWT_SECRET, {expiresIn: "7d"});
    
}

exports.VerifyTokenUser = (token)=>{
    try{
        let user=jwt.verify(token,process.process.env.JWT_SECRET);
        return user;
        }catch(err){
            console.log("Invalid token");
            return false;
            }
};