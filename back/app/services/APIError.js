class APIError extends Error{
    constructor(message, status, err){
        super(message);
        if(err){
            this.error = err;
        }
<<<<<<< HEAD
        this.status = status;
=======
        this.message;
        this.code = code;
>>>>>>> a7f24220935b7052b7f8ce185bd1bfdab3a145f7
        this.date = new Date();
    }
}

module.exports = APIError;