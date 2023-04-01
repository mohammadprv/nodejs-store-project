const Joi = require('@hapi/joi');
const { MONGOIDPATTERN } = require('../../utils/constant');


const mongoIDValidator = Joi.object({
    id: Joi.string().pattern(MONGOIDPATTERN).error(new Error("شناسه ارسال شده صحیح نمیباشد"))
})


module.exports = {
    mongoIDValidator
}