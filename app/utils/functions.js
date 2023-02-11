const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/users');
const { SECRET_KEY } = require('./constant');
const createError = require('http-errors');

function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000);
}

function createAccessToken(userID) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userID);
        const payload = {
            phone: user.phone,
            userID: user._id
        }
        jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
            if(err) reject(createError.InternalServerError("خطای سرور"));
            resolve(token);
        });
    })
}

module.exports = {
    randomNumberGenerator,
    createAccessToken
}