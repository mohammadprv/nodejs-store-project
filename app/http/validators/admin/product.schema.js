const Joi = require('@hapi/joi');
const { MONGOIDPATTERN } = require('../../../utils/constant');
const createError = require('http-errors');

const addProductSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان بلاگ صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن وارد شده صحیح نمیباشد")),
    short_text: Joi.string().error(createError.BadRequest("متن وارد شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("تعداد هشتگ ها نمیتواند بیشتر از 20 آیتم باشد")),
    category: Joi.string().pattern(MONGOIDPATTERN).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createError.BadRequest("تعداد محصول وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    weight: Joi.allow(null).error(createError.BadRequest("وزن وارد شده صحیح نمیباشد")),
    length: Joi.allow(null).error(createError.BadRequest("طول وارد شده صحیح نمیباشد")),
    height: Joi.allow(null).error(createError.BadRequest("ارتفاع وارد شده صحیح نمیباشد")),
    width: Joi.allow(null).error(createError.BadRequest("عرض وارد شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow(),
    image: Joi.allow()
})

module.exports = {
    addProductSchema
}