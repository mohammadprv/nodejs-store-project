const { HomeRoutes } = require('./api');
const { DeveloperRotes } = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth');

const router = require('express').Router();


//? Developer Routes
router.use("/developer", DeveloperRotes)


//? User Auth Routes
router.use("/user", UserAuthRoutes);

//? Home Route
router.use("/", HomeRoutes);


module.exports = {
    AllRoutes: router
}