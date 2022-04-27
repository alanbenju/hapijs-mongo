/*import Hapi from "@hapi/hapi"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { rateRoutes } from "./src/routes/Rate.route.js";
import { pairRoutes } from "./src/routes/Pair.route.js";

dotenv.config()

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.events.on('response', function (request) {
        request.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.route.path + ' --> ' + request.response.statusCode);
    });

    //TODO: Add logger

    mongoose
        .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
        .then(() => {
            console.log("db connected!");
        })
        .catch((e) => {
            console.log("Error connecting to db", e);
        });

    server.route(rateRoutes)
    server.route(pairRoutes)

    await server.start();

    console.log('Server running on %s', server.info.uri);
}

init();  */

import { start } from './server'
import { init } from './server'
const initializeServer = async () => {
    await init()
    await start()
}

initializeServer()
