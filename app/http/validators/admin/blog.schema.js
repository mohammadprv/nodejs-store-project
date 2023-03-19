const Joi = require('@hapi/joi');
const { MONGOIDPATTERN } = require('../../../utils/constant');
const createError = require('http-errors');

const createBLogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان بلاگ صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن وارد شده صحیح نمیباشد")),
    short_text: Joi.string().error(createError.BadRequest("متن وارد شده صحیح نمیباشد")),
    image: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("تعداد هشتگ ها نمیتواند بیشتر از 20 آیتم باشد")),
    category: Joi.string().pattern(MONGOIDPATTERN).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد"))
})

module.exports = {
    createBLogSchema
}