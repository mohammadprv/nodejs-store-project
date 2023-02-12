const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../../model/users');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constant');

const VerifyAccessToken = (req, res, next) => {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    
    if(token && bearer.toLowerCase() === "bearer") {
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { phone } = payload || {};
            const user = await UserModel.findOne({ phone }, { password: 0, otp: 0});
            if(!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            return next();
        })
    }else {
        return next(createError.Unauthorized("وارد حساب کاربری خود شوید"));
    }
}


module.exports = {
    VerifyAccessToken
}