const { AdminRoutes } = require('./admin/admin.routes');
const { HomeRoutes } = require('./api');
const { DeveloperRotes } = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth');

const router = require('express').Router();

//? Developer Routes
router.use("/developer", DeveloperRotes)

//? Admin Routes
router.use("/admin", AdminRoutes);


//? User Auth Routes
router.use("/user", UserAuthRoutes);

//? Home Route
router.use("/", HomeRoutes);


module.exports = {
    AllRoutes: router
}