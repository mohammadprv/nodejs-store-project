const createError = require('http-errors');
const { UserModel } = require('../../../../model/users');
const { EXPIRES_IN, USER_ROLE } = require('../../../../utils/constant');
const { randomNumberGenerator, createAccessToken } = require('../../../../utils/functions');
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
                expiresIn: EXPIRES_IN
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
                    Roles: [USER_ROLE]
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
            return res.json({
                data: {
                    accessToken
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