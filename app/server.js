const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { AllRoutes } = require('./routes/router');
const morgan = require('morgan');

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
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
    }

    createServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`Server Is Up And Online On Port: ${ this.#PORT }`);     
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
            return res.status(404).json({
                statusCode: 404,
                message: "آدرس یا صفحه مورد نظر یافت نشد"
            })
        })

        this.#app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            const message = err.message || "Internal Server Error";
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })

    }

}