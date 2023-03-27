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
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTkwMjUxNTE3IiwiaWF0IjoxNjc5OTEwNTI0LCJleHAiOjE2Nzk5MTQxMjR9.BM4pu_C8mWRzI0EzoZBvD-BVzgJsofWJOFfMjFzj3kM
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTkwMjUxNTE3IiwiaWF0IjoxNjc5OTEwNTI0LCJleHAiOjE2Nzk5MTQxMjR9.BM4pu_C8mWRzI0EzoZBvD-BVzgJsofWJOFfMjFzj3kM
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTkwMjUxNTE3IiwiaWF0IjoxNjc5OTEwNTI0LCJleHAiOjE2Nzk5MTQxMjR9.BM4pu_C8mWRzI0EzoZBvD-BVzgJsofWJOFfMjFzj3kM
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTkwMjUxNTE3IiwiaWF0IjoxNjc5OTEwNTI0LCJleHAiOjE2Nzk5MTQxMjR9.BM4pu_C8mWRzI0EzoZBvD-BVzgJsofWJOFfMjFzj3kM
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTkwMjUxNTE3IiwiaWF0IjoxNjc5OTEwNTI0LCJleHAiOjE2Nzk5MTQxMjR9.BM4pu_C8mWRzI0EzoZBvD-BVzgJsofWJOFfMjFzj3kM
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