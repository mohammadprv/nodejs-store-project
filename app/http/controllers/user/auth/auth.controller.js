const createError = require('http-errors');
const { UserModel } = require('../../../../model/users');
const { ROLES } = require('../../../../utils/constant');
const { randomNumberGenerator, createAccessToken, signAccessToken, createRefreshToken, verifyRefreshToken } = require('../../../../utils/functions');
const { getOtpSchema, checkOtpSchema } = require('../../../validators/user/auth.schema');
const Controller = require('../../controller');

class UserAuthController extends Controller {
    
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body);
        
            //? Create OTP => randomCode with expires
            const code = randomNumberGenerator();
            let otp = {
                code,
                expiresIn: new Date().getTime() + 120000
            }
    
            const { phone } = req.body;
            const user = await UserModel.findOne({ phone });

            //? Check if user already existed => if exist => update that with new OTP
            if(user) {
                const updateResult = await UserModel.updateOne({ phone }, { $set: {otp} });
                if(updateResult.modifiedCount == 0) throw createError.InternalServerError("خطای سرور");

            } else {
                //? Else crate new user in database
                const createUserResult = await UserModel.create({
                    phone,
                    otp,
                    Roles: [ROLES.USER]
                })
                if(!createUserResult) throw createError.InternalServerError("خطای سرور");
            }

            //? Send Data
            return res.status(200).send({
                data: {
                    statusCode: 200,
                    message: "کد اعتبارسنجی برای شما ارسال شد",
                    code,
                    phone
                }
            })

        } catch (error) {
            next(error);
        }
    }

    async checkOTP(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body);
            const { phone, code } = req.body;

            const user = await UserModel.findOne({ phone });
            if(!user) throw createError.NotFound("کاربری با این شماره یافت نشد");
            if(user.otp.code != code) throw createError.Unauthorized("کد وارد شده صحیح نمیباشد");
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw createError.Unauthorized("کد وارد شده منقضی شده است");
    
            const accessToken = await createAccessToken(user._id);
            const refreshToken = await createRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken
                }
            })

        } catch (error) {
            next(error);
        }

    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const phone = await verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({ phone });
            const newRefreshToken = await createRefreshToken(user._id);
            const accessToken = await createAccessToken(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })

        } catch (error) {
            next(error);
        }
    }


}


module.exports = {
    UserAuthController: new UserAuthController()
}