const APIError = require('../APIError');
const {subscribeFormSchema, loginFormSchema} = require('./formSchema');

const validationFormService ={
    checkSubscribeForm : (req, res, next) => {
        const {value, error} = subscribeFormSchema.validate(req.body);
        if(!error){
            return next();
        }else{
            let err = new APIError("Votre formulaire n'est pas correct", 400);
            return res.json(err);
        }
    },

    checkLogInForm : (req, res, next) => {
        const {value, error} = loginFormSchema.validate(req.body);
        if(!error){
            return next();
        }else{
            let err = new APIError("Votre formulaire n'est pas correct", 400);
            return next(err);
        }
    },
};

module.exports = validationFormService