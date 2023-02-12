const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/users');
const { ACCESS_TOKEN_SECRET_KEY } = require('./constant');
const createError = require('http-errors');

//? Create random number for OTP
function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000);
}

//? Create token for authorize users
function createAccessToken(userID) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userID);
        const payload = {
            phone: user.phone
        }
        jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
            if(err) reject(createError.InternalServerError("خطای سرور"));
            resolve(token);
        });
    })
}


module.exports = {
    randomNumberGenerator,
    createAccessToken,
}