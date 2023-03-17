const { CategoryController } = require('../../http/controllers/admin/category.controller');

const router = require('express').Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: Create new category title
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: parent
 *                  required: false
 *                  type: string
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", CategoryController.addCategory);


module.exports = {
    CategoryRoutes: router
}