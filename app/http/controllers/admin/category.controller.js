const createError = require('http-errors');
const mongoose = require('mongoose');

const { CategoryModel } = require("../../../model/categories");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");

class CategoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const category = await CategoryModel.create({ title, parent });
            if(!category) throw createError.InternalServerError("خطای داخلی");
            return res.status(201).json({
                data: {
                    statusCode: 201,
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
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "دسته بندی با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    editCategory(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async getAllCategory(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent",
                        depthField: "depth",
                        maxDepth: 5,
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                },
                {
                    $match: {
                        parent: undefined
                    }
                }
            ]);
            return res.status(200).json({
                data: {
                    statusCode: 200,
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
            const categories = await CategoryModel.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from : "categories",
                        foreignField: "parent",
                        localField: "_id",
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                }
            ]);

            return res.status(200).json({
                data: {
                    statusCode: 200,
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
            return res.status(200).json({
                data: {
                    statusCode: 200,
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
            return res.status(200).json({
                data: {
                    statusCode: 200,
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