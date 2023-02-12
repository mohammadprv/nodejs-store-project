const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { AllRoutes } = require('./routes/router');
const morgan = require('morgan');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

module.exports = class Application {

    #app = express();
    #PORT;
    #DB_URI;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandler();
    }

    configApplication(){
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
        //? Swagger Config
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition: {
                info: {
                    title: "Store Project",
                    version: "1.0.0",
                    description: "A Store Restful API"
                },
                servers: [
                    {
                        url: "http://localhost:5000"
                    }
                ]
            },
            apis: ["./app/routes/**/*.js"]
        })))
    }

    createServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`Server Is Up And Online On Port: ${ this.#PORT } \n http://localhost:5000`);     
        })
    }

    connectToMongoDB() {
        mongoose.set("strictQuery", true);
        mongoose.connect(this.#DB_URI, (error) => {
            if (!error) return console.log("Connected To MongoDB");
            return console.log(error.message);
        })

        mongoose.connection.on("connected", () => {
            console.log("mongoose enabled");
        })

        mongoose.connection.on("disconnected", () => {
            console.log("mongoose enabled");
        })

        //? Close Connection When ^C
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        })

    }

    createRoutes() {
        this.#app.use(AllRoutes);        
    }

    errorHandler() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("آدرس یا صفحه مورد نظر یافت نشد"));
        })

        this.#app.use((err, req, res, next) => {
            const serverError = createError.InternalServerError();
            const statusCode = err.status || serverError.status;
            const message = err.message || serverError.message;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    message
                }
            })
        })

    }

}