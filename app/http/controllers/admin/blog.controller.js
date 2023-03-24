const path = require('path');
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
            return res.status(201).json({
                statusCode: 201,
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
            return res.status(200).json({
                statusCode: 200,
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
            return res.status(200).json({
                statusCode: 200,
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
            return res.status(200).json({
                statusCode: 200,
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