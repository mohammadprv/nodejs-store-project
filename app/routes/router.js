const { HomeRoutes } = require('./api');
const { UserAuthRoutes } = require('./user/auth');

const router = require('express').Router();


//? User Auth Routes
router.use("/user", UserAuthRoutes);

//? Home Route
router.use("/", HomeRoutes);


module.exports = {
    AllRoutes: router
}