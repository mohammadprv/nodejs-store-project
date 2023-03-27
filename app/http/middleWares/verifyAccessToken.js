const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../../model/users');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constant');

function getToken(headers) {
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if(token && bearer.toLowerCase() === "bearer") return token;
    throw createError.Unauthorized("حساب کاربری یافت نشد وارد حساب کاربری خود شوید");
}

const VerifyAccessToken = (req, res, next) => {
    try {
        const token = getToken(req.headers);
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if(err) throw(createError.Unauthorized("وارد حساب کاربری خود شوید"));
                const { phone } = payload || {};
                const user = await UserModel.findOne({ phone }, { password: 0, otp: 0});
                if(!user) throw(createError.Unauthorized("حساب کاربری یافت نشد"));
                req.user = user;
                return next();
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }

}

const checkRole = (role) => {
    return function(req, res, next) {
        try {
            const user = req.user;
            if(user.Roles.includes(role)) return next();
            throw createError.Forbidden("شما به این بخش دسترسی ندارید");
        } catch (error) {
            next(error);
        }
    }
} 

module.exports = {
    VerifyAccessToken,
    checkRole
}