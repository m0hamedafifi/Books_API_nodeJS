class BaseError extends Error{
    constructor(name , httpStatusCode ,description,isOperational ) {
        super(description);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name ;
        this.httpStatusCode= httpStatusCode;
        this.isOperational = isOperational;
        // capture the stack trace to be able to see where the error came from
        Error.captureStackTrace(this,BaseError);
    }

};

module.exports = BaseError ; 