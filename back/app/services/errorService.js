const APIError = require('./APIError');

const errorService = {
    errorNotFound(req,res){
        const err = new APIError("Page introuvable",404, "Page introuvable");
        
        res.status(err.status).json(err);
    },

    controlWrapper(mdw){
        return async (req, res, next) => {
            try {
                await mdw(req, res,next);
            } catch (error) {
                let errorCW = new APIError("Une erreur est survenue, veuillez réessayer",500);
                res.json(errorCW);
            }
        }
    },
};

module.exports = errorService;