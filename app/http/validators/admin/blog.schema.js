const Joi = require('@hapi/joi');
const { MONGOIDPATTERN } = require('../../../utils/constant');

const createBLogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان بلاگ صحیح نمیباشد")),
    text: Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    short_text: Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    image: Joi.string().error(new Error("تصویر ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(new Error("تعداد هشتگ ها نمیتواند بیشتر از 20 آیتم باشد")),
    category: Joi.string().pattern(MONGOIDPATTERN).error(new Error("دسته بندی مورد نظر یافت نشد"))
})

module.exports = {
    createBLogSchema
}