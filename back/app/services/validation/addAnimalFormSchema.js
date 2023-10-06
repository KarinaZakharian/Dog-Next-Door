const Joi = require('joi').extend(require('@joi/date'));

const addAnimalFormSchema = Joi.object({
    animal: Joi.string().required(),
    name: Joi.string().required(),
    race: Joi.string().required(),
    date_birth: Joi.string().required(),
    size: Joi.string().required(),
    walk: Joi.string().required(),
    mealhours: Joi.string().required(),
    energy: Joi.string().required()
})

module.exports = addAnimalFormSchema;