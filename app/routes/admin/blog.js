const { BlogController } = require('../../http/controllers/admin/blog.controller');
const { stringToArray } = require('../../http/middleWares/stringToArray');
const { uploadFile } = require('../../utils/multer');

const router = require('express').Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: Title of new blog
 *                  short_text:
 *                      type: string
 *                      description: Blog text summary 
 *                  text:
 *                      type: string
 *                      description: Blog main text
 *                  tags:
 *                      type: string
 *                      description: List of tags => for example => tag1#tag2#tag3
 *                  category:
 *                      type: string
 *                      description: Related category ID
 *                  image:
 *                      type: file
 *                      description: Blog main image
 */


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
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/formdata:
 *                      schema: 
 *                          $ref: "#/components/schemas/Blog"
 *          responses:
 *              201:
 *                  description: creates
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), BlogController.createBlog);


/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: Get blog by ID and populate this field
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success
 */
router.get("/:id", BlogController.getBlogById);


/**
 * @swagger
 *  /admin/blogs/remove/{id}:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: remove blog by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success
 */
router.get("/remove/:id", BlogController.deleteBlogById);



/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(Admin-Panel)]
 *          summary: Update blog by ID
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  type: string
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses:
 *              201:
 *                  description: creates
 */
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), BlogController.updateBlogById);


module.exports = {
    BlogAdminApiRoutes: router
}