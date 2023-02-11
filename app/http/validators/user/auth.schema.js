const Joi = require('@hapi/joi');

const getOtpSchema = Joi.object({
    phone: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمیباشد"))
})

const checkOtpSchema = Joi.object({
    phone: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمیباشد")),
    code: Joi.string().min(4).max(6).error(new Error("کد وارد شده صحیح نمیباشد")),
})

module.exports = {
    getOtpSchema,
    checkOtpSchema
}