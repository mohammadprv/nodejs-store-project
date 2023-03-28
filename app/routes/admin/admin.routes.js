const { AdminApiBlogRouter } = require('./blog');
const { AdminApiCategoryRouter } = require('./category');
const { AdminApiProductRouter } = require('./product');

const router = require('express').Router();


/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin Actions
 *      -   name: Product(Admin-Panel)
 *          description: All Product Management Rotes For Admins
 *      -   name: Category(Admin-Panel)
 *          description: All Category Routes
 *      -   name: Blog(Admin-Panel)
 *          description: All Blog Management Routes For Admins

 */
router.use("/category", AdminApiCategoryRouter);

router.use("/blogs", AdminApiBlogRouter);

router.use("/product", AdminApiProductRouter);


module.exports = {
    AdminRoutes: router
}