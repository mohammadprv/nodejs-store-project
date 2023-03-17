const { CategoryRoutes } = require('./category');

const router = require('express').Router();


/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: Admin Actions
 */
router.use("/category", CategoryRoutes);

module.exports = {
    AdminRoutes: router
}