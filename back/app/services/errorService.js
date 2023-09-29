const APIError = require('./APIError');

const errorService = {
    errorNotFound(req,res,next){
        const errorMessage = new APIError("Page introuvable", 404);
        next(errorMessage);
    },

    controlWrapper(mdw){
        return async (req, res, next) => {
            try {
                await mdw(req, res,next);
            } catch (error) {
                let errorCW = new APIError("Une erreur est survenue, veuillez réessayer",500);
                return errorCW;
            }
        }
    },
};

module.exports = errorService;