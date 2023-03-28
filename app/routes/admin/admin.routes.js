const { VerifyAccessToken } = require('../../http/middleWares/verifyAccessToken');
const { BlogAdminApiRoutes } = require('./blog');
const { CategoryRoutes } = require('./category');
const { AdminApiProductRouter } = require('./product');

const router = require('express').Router();


/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin Actions
 *      -   name: Category(Admin-Panel)
 *          description: All Category Routes
 *      -   name: Blog(Admin-Panel)
 *      -   description: All Blog Management Routes For Admins
 */
router.use("/category", CategoryRoutes);

router.use("/blogs", VerifyAccessToken, BlogAdminApiRoutes);


router.use("/product", AdminApiProductRouter);


module.exports = {
    AdminRoutes: router
}