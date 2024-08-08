const User = require('../models/user-model');

exports.checkEmailExists = (query) => {
    return User.findOne(query)
        .then(user => {
            if(user) return true
            else return false;
        })
        .catch(err => { throw err })
}

exports.createUser = (data) => {
    return User.create(data)
        .then(user => {
            user.encry_password = undefined;
            user.salt = undefined;
            return user
        })
        .catch(err => { throw err })
}

exports.getUser = (query) => {
    return User
        .findOne(query)
        .then(user => {
            if (user) return user;
            else return null
        })
        .catch(err => { throw err })
}