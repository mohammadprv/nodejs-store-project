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


/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Get All Parents
 *          responses:
 *              200:
 *                  description: success 
 */
router.get("/parents", CategoryController.getAllParents);

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Get All Children Of Parent
 *          parameters: 
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success 
 */
router.get("/children/:parent", CategoryController.getChildrenOfParent);

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Get All Category with their children
 *          responses:
 *              200:
 *                  description: success 
 */
router.get("/all", CategoryController.getAllCategory);


/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: Remove Category via ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *          responses:
 *              200:
 *                  description: success 
 */
router.delete("/remove/:id", CategoryController.removeCategory);


/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Get category via ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *          responses:
 *              200:
 *                  description: success 
 */
router.get("/:id", CategoryController.getCategoryByID);


module.exports = {
    CategoryRoutes: router
}