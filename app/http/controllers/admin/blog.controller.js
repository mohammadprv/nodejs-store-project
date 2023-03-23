const path = require('path');
const createError = require('http-errors');
const { BlogModel } = require('../../../model/blogs');
const { createBLogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");

class BlogController extends Controller {
    async createBlog(req, res, next) {
        try {
            const blogDataBody = await createBLogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename).replace(/\\/g, "/");
            req.body.image = `${req.protocol}://${req.get("host")}/${req.body.image}`;
            const { title, text, short_text, category, tags } = blogDataBody;
            const image = req.body.image;
            const blog = await BlogModel.create({ title, image, text, short_text, category, tags });
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
    
    async getBlogById(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async getListOfBlogs(req, res, next) {
        try {
            return res.status(200).json({
                statusCode: 200,
                data: {
                    blogs: []
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
    
}



module.exports = {
    BlogController: new BlogController()
}