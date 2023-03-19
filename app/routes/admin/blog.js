const { BlogController } = require('../../http/controllers/admin/blog.controller');
const { stringToArray } = require('../../http/middleWares/stringToArray');
const { uploadFile } = require('../../utils/multer');

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
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  type: string
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses:
 *              201:
 *                  description: creates
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), BlogController.createBlog);

module.exports = {
    BlogAdminApiRoutes: router
}