const Joi = require("joi");
const { validateRequest } = require("./validate-req");

exports.loginSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    validateRequest(req, res, next, schema);
}

exports.createAccountSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    validateRequest(req, res, next, schema);
}