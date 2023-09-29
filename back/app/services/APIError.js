class APIError extends Error{
    constructor(message,code,err){
        super(message);
        if(err){
            this.error = err;
        }
        this.message;
        this.code = code;
        this.date = new Date();
    }
}

module.exports = APIError;