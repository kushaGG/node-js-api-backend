const Joi = require('@hapi/joi');

const regValidation = data => {
    const schema = Joi.object({
        email:
            Joi.string()
                .required(),
        username:
            Joi.string()
                .required(),
        password:
            Joi.string()
                .min(6)
                .required()
    });
    return schema.validate(data);
}

module.exports.regValidation = regValidation;