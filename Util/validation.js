var passwordValidator = require('password-validator');
var passwordChecker = new passwordValidator();

module.exports.isValidPassword =  (password)=>{
    
    // Add properties to the password validator
    passwordChecker
    .is().min(10)                     // Minimum length 8
    .is().max(20)                   // Maximum length 10
    .has().uppercase()                // At least one uppercase letter
    .has().lowercase()               // At least one lowercase letter
    .has().digits()                   // At least one digit
    .has().not().spaces();                      // Should not contain spaces
    try {
        // Validate the password against the passwordChecker
        let result = passwordChecker.validate(password,{details:true});
        if (result.length > 0) {
            return result;
        }
        return true;
        } catch (err) {
            console.log("Error at validation  password : "+ err);
            return false;
            }
            
};


exports.isValidEmail = (email) =>{
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!regex.test(email)){
        return false;
        }
        return true;
}

exports.validateUserName = (userName) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/gm;
    if (!usernameRegex.test(userName)) {
        new Error(`Username should only contains letters and underscores`);
        return false;
        } else {
            return true;
            }
}