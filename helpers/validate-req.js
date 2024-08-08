const constants = require("../constants");
const { sendResponse } = require("./sendResponse");

exports.validateRequest = (req, res, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        return sendResponse({res, status: constants.status.BAD_REQUEST, message: 'Validation Error', data: {message: `Validation error: ${error.details.map(x => x.message).join(', ')}`}})
    } else {
        req.body = value;
        next();
    }
}