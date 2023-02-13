const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constant');
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


//? Create refresh token
function createRefreshToken(userID) {
    return new Promise( async (resolve, reject) => {
        const user = await UserModel.findById(userID);
        const payload = { phone: user.phone };
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1y" }, (err, token) => {
            if(err) reject (createError.InternalServerError("خطای سرور"));
            resolve(token);
        })
    })
}

//? Verify refreshToken
function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { phone } = payload || {};
            const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
            if(!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
            resolve(phone);
        })
    })
}





module.exports = {
    randomNumberGenerator,
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken
}