const Joi = require('joi');

const loginFormSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr', 'school'] } }).required(),
    password: Joi.required()
}).required();

module.exports = loginFormSchema;