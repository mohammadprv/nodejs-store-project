const Joi = require('@hapi/joi');
const { MONGOIDPATTERN } = require('../../../utils/constant');

const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("نام دسته بندی صحیح نمی باشد")),
    parent: Joi.string().pattern(MONGOIDPATTERN).allow("").error(new Error("شناسه وارد شده صحیح نمیباشد"))
})

const editCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("نام دسته بندی صحیح نمی باشد"))
})

module.exports = {
    addCategorySchema,
    editCategorySchema
}