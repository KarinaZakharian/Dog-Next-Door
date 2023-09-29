const APIError = require('../APIError');
const subscribeFormSchema = require('./subscribeFormSchema');
const loginFormSchema = require('./loginFormSchema');

const validationFormService ={
    checkSubscribeForm : (req, res, next) => {
        let { error } = subscribeFormSchema.validate(req.body);
        if(!error){
            next();
        }else{
            let error = new APIError("Votre formulaire n'est pas correct", 400);
            res.json(error);
        }
    },

    checkLogInForm : (req, res, next) => {
        let { error } = loginFormSchema.validate(req.body);
        if(!error){
            next();
        }else{
            let error = new APIError("Votre formulaire n'est pas correct", 400);
            res.json(error);
        }
    },
};

module.exports = validationFormService;