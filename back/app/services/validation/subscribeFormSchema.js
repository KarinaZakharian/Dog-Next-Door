const Joi = require('joi');

const subscribeFormSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    address : Joi.string().pattern(new RegExp('^\d+\s[A-z\s\d]+,\s\d{5}\s[A-z\s]+$')).required(),
    latitude : Joi.string().pattern(new RegExp('^-?([1][2][3][4][5][6]?[1][2][3][4][5][6]|90)(\.[1][2][3][4][5][6]{1,10})?$')).required(),
    longitude : Joi.string().pattern(new RegExp('^-?([1][2][3][4][5][6]{1,2}|1[1][2][3][4][5][6][1][2][3][4][5][6]|180)(\.[1][2][3][4][5][6]{1,10})?$')).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr', 'school'] } }).required(),
    password: Joi.required()
}).required;

module.exports = subscribeFormSchema;

