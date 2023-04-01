const createError = require('http-errors');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const { CategoryModel } = require("../../../model/categories");
const { addCategorySchema, editCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");

class CategoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const category = await CategoryModel.create({ title, parent });
            if(!category) throw createError.InternalServerError("خطای داخلی");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "دسته بندی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async removeCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findById(id);
            if (!category) throw createError.NotFound("دسته بندی یافت نشد");
            const deleteResult = await CategoryModel.deleteMany({$or: [
                { _id: category._id },
                { parent: category._id }
            ]});
            if(deleteResult.deletedCount == 0) throw createError.InternalServerError("دسته بندی حذف نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "دسته بندی با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async editCategoryTitle(req, res, next) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const category = await CategoryModel.findById(id);
            if(!category) throw createError.NotFound("دسته بندی یافت نشد");
            await editCategorySchema.validateAsync(req.body);
            const updateResult = await CategoryModel.updateOne({ _id: id }, { $set: { title } });
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("به روزرسانی انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "به روزرسانی انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getAllCategory(req, res, next) {
        try {
            const categories = await CategoryModel.find({ parent: undefined });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getCategoryByID(req, res, next) {
        try {
            const { id } = req.params;
            const categories = await CategoryModel.findOne({ _id: id }, { parent: 0, __v: 0 });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    categories
                }
            })

        } catch (error) {
            next(error);
        }
    }


    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({ parent: undefined }, { __v: 0 });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    parents
                }
            })
        } catch (error) {
            next(error);
        }
    }


    async getChildrenOfParent(req, res, next) {
        try {
            const { parent } = req.params;
            const children = await CategoryModel.find({ parent }, { __v: 0, parent: 0 });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    children
                }
            })
        } catch (error) {
            next(error);
        }
    }

}

module.exports = {
    CategoryController: new CategoryController()
}