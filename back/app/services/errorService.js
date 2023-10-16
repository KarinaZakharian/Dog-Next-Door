const APIError = require('./APIError');

const errorService = {
    errorNotFound(req,res){
        const err = new APIError("Page introuvable", 404);
        res.status(err.status).json(err.message);
    },

    controlWrapper(mdw){
        return async (req, res, next) => {
            try {
                await mdw(req, res, next);
            } catch (error) {
                let err = new APIError("Une erreur est survenue, veuillez réessayer", 500);
                res.status(err.status).json(err);
            }
        }
    },
};

module.exports = errorService;