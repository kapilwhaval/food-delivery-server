const constants = require("../constants");
const { sendResponse } = require("../helpers/sendResponse");
const jwt = require("jsonwebtoken");
const { createUser, getUser, checkEmailExists } = require("../services/user-service");
const { status } = constants;

exports.createAccount = (req, res) => {
    return checkEmailExists({ email: req.body.email })
        .then(exists => {
            if (!exists) { return createUser(req.body) }
            else throw { status: status.ALREADY_EXIST, message: 'Account already exist with this email' };
        })
        .then(user => {
            return sendResponse({ res, status: status.OK, message: 'Account Created!', data: { user } })
        })
        .catch(err => {
            sendResponse({ res, status: err.status || status.INTERNAL_SERVER_ERROR, message: err.message || 'Error creating account', data: { message: err?.message } })
        });
}

exports.login = (req, res) => {
    return getUser({ email: req.body.email })
        .then(user => {
            if (user) {
                if (user.authenticate(req.body.password) && !user.is_deleted) {
                    user.salt = undefined;
                    user.encry_password = undefined;
                    let token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
                    return sendResponse({ res, status: status.OK, message: 'Login Successful!', data: { user, token } })
                }
                else return sendResponse({ res, status: status.NOT_FOUND, message: 'Invalid email or password' });
            } else return sendResponse({ res, status: status.NOT_FOUND, message: 'User not found' })
        })
        .catch(err => sendResponse({ res, status: status.INTERNAL_SERVER_ERROR, message: err.message || 'Error logging in', data: { err } }));
}