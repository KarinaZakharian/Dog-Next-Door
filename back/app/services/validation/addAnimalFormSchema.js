const Joi = require('joi').extend(require('@joi/date'));

const addAnimalFormSchema = Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    breed: Joi.string().required(),
    birthdate: Joi.date().format('DD-MM-YYYY').required(),
    weight_category: Joi.string().required(),
    potty_break_schedule: Joi.string().required(),
    feeding_schedule: Joi.string().required(),
    energy_level: Joi.string().required()
})

module.exports = addAnimalFormSchema;