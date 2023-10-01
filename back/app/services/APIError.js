class APIError extends Error{
    constructor(message, status, err){
        super(message);
        if(err){
            this.error = err;
        }
        this.status = status;
        this.date = new Date();
    }
}

module.exports = APIError;