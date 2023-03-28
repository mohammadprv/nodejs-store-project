const homeController = require('../../http/controllers/api/home.controller');
const { VerifyAccessToken } = require('../../http/middleWares/verifyAccessToken');

const router = require('express').Router();
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Index Page Route And Data
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: Index Route
 *      tags: [IndexPage]
 *      description: get all data for index page
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */

router.get("/", homeController.indexPage);

module.exports = {
    HomeRoutes: router
}