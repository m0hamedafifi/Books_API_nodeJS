const BaseError = require("./base.error");

class APIError extends BaseError {

    constructor(name , httpStatusCode ,description,isOperational ){
        super( name , description , isOperational );
        this.httpStatusCode= httpStatusCode;
    }
};

module.exports = APIError ;