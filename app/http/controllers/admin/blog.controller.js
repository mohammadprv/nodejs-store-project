const path = require('path');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const { BlogModel } = require('../../../model/blogs');
const { createBLogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");

class BlogController extends Controller {
    async createBlog(req, res, next) {
        try {
            const user = req.user;
            const blogDataBody = await createBLogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename).replace(/\\/g, "/");
            req.body.image = `${req.protocol}://${req.get("host")}/${req.body.image}`;
            const { title, text, short_text, category, tags } = blogDataBody;
            const image = req.body.image;
            const blog = await BlogModel.create({ title, image, text, short_text, category, tags, author: user._id });
            if(!blog) throw createError.InternalServerError("بلاگ جدید ایجاد نشد");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "بلاگ جدید با موفقیت ساخته شد",
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getListOfBlogs(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                {
                    $match: {}
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $project: {
                        "author.__v": 0,
                        "author.otp": 0,
                        "author.bills": 0,
                        "author.discount": 0,
                        "author.Roles": 0,
                    }
                },
                {
                    $unwind: "$author",
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $project: {
                        "category.__v": 0
                    }
                },
                {
                    $unwind: "$category"
                }
            ]);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    blogs
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.findBlog({ _id: id });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    blog
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getCommentsOfBlog(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async deleteBlogById(req, res, next) {
        try {
            const { id } = req.params;
            await this.findBlog({ _id: id });
            const result = await BlogModel.deleteOne({ _id: id });
            if(result.deletedCount == 0) throw createError.InternalServerError("حذف انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "حذف بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async updateBlogById(req, res, next) {
        try {
            const { id } = req.params;
            if(req?.body?.fileUploadPath && req?.body?.filename) {
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, "/");
                req.body.image = `${req.protocol}://${req.get("host")}/${req.body.image}`;
            }
            const data = req.body;
            const badValues = ["", " ", "0", 0, null, undefined];
            const blackListFields = ["comments", "like", "dislike", "bookmark", "author"];
            Object.keys(data).forEach(key => {
                if(blackListFields.includes(key)) delete data[key];
                if(typeof data[key] == "string") data[key] = data[key].trim();
                if(Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim());
                if(badValues.includes(data[key])) delete data[key];
            });
            const updateBlogResult = await BlogModel.updateOne({ _id: id }, { $set: data });
            if(updateBlogResult.modifiedCount == 0) throw createError.InternalServerError("بروزرسانی بلاگ انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "بروزرسانی بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    

    async findBlog(query = {}) {
        const blog = await BlogModel.findOne(query).populate([{ path: "category", select: ["title"] }, { path: "author", select: ["phone", "first_name", "last_name"] }]);
        if(!blog) throw createError.NotFound("هیچ بلاگی یافت نشد")
        return blog;
    }


}



module.exports = {
    BlogController: new BlogController()
}