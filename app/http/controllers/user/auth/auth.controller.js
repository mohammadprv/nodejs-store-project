const createError = require('http-errors');
const { UserModel } = require('../../../../model/users');
const { EXPIRES_IN, USER_ROLE } = require('../../../../utils/constant');
const { randomNumberGenerator } = require('../../../../utils/functions');
const { authSchema } = require('../../../validators/user/auth.schema');
const Controller = require('../../controller');

class UserAuthController extends Controller {

    async login(req, res, next) {
        try {
            await authSchema.validateAsync(req.body); //? Validate req.body => phone

            const { phone } = req.body;
            const code = randomNumberGenerator();

            const result = await this.saveUser(phone, code);

            if(!result) throw createError.Unauthorized("ورود شما با مشکل مواجه شد");

            return res.status(200).send({
                data: {
                    statusCode: 200,
                    message: "کد اعتبارسنجی برای شما ارسال شد",
                    code,
                    phone
                }
            });
            
            
        } catch (error) {
            next(createError.BadRequest(error.message));
        }
    }

    async saveUser(phone, code) {
        let otp = {
            code,
            expiresIn: EXPIRES_IN
        }
        const user = await this.checkExistUser(phone);
        if(user) {
            return (await this.updateUser(phone, {otp}))
        }
        return !!(await UserModel.create({
            phone,
            otp,
            Roles: [USER_ROLE]
        }))
    }

    async checkExistUser(phone) {
        const user = await UserModel.findOne({ phone });
        return !!user;
    }

    async updateUser(phone, objectData = {}) {
        const badValues = ["", " ", 0, -1, NaN, undefined, null];
        Object.values(objectData).forEach(value => {
            if(badValues.includes(objectData[value])) delete objectData[value];
        })
        const result = await UserModel.updateOne({ phone }, { $set: objectData });
        return !!result.modifiedCount;
    }


}


module.exports = {
    UserAuthController: new UserAuthController()
}