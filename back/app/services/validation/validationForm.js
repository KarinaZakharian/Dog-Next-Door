const APIError = require('../APIError');
const subscribeFormSchema = require('./subscribeFormSchema');
const loginFormSchema = require('./loginFormSchema');
const accountFormSchema = require('./accountFormSchema');
const addAnimalFormSchema = require('./addAnimalFormSchema');

const validationFormService = {
  checkSubscribeForm: (req, res, next) => {
    let { error } = subscribeFormSchema.validate(req.body);
    if (!error) {
      next();
    } else {
      let err = new APIError(error.details[0].message, 400, error, 400, error);
      res.json(err.message);
    }
  },

  checkLogInForm: (req, res, next) => {
    let { error } = loginFormSchema.validate(req.body);
    if (!error) {
      next();
    } else {
      let err = new APIError(error.details[0].message, 400, error, 400, error);
      res.json(err.message);
    }
  },

  checkAccountForm: (req, res, next) => {
    let { error } = accountFormSchema.validate(req.body);
    console.log(error);
    if (!error) {
      next();
    } else {
      let err = new APIError(error.details[0].message, 400, error, 400, error);
      res.json(err.message);
    }
  },

  checkAddAnimalForm: (req, res, next) => {
    let { error } = addAnimalFormSchema.validate(req.body);
    if (!error) {
      next();
    } else {
      let err = new APIError(error.details[0].message, 400, error);
      res.json(err.message);
    }
  },
};

module.exports = validationFormService;
