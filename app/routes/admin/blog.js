const { BlogController } = require('../../http/controllers/admin/blog.controller');

const router = require('express').Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: Get All Blogs
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/", BlogController.getListOfBlogs);


/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(Admin-Panel)]
 *          summary: Create new blog
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/add", BlogController.createBlog);

module.exports = {
    BlogAdminApiRoutes: router
}