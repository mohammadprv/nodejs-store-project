const { CategoryRoutes } = require('./category');

const router = require('express').Router();


/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin Actions
 *      -   name: Category(Admin-Panel)
 *          description: All Category Routes
 */
router.use("/category", CategoryRoutes);

module.exports = {
    AdminRoutes: router
}