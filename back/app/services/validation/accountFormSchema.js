const Joi = require('joi');

const accountFormSchema = Joi.object({
    accomodation: Joi.string().required(),
    garden: Joi.string().required(),
    animal_size: Joi.string().required(),
    additionnal_information: Joi.string().required(),
    walking_duration: Joi.string().required()
    
}).required();

module.exports = accountFormSchema;

