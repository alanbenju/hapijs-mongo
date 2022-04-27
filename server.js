import Hapi from '@hapi/hapi'
import dotenv from 'dotenv'
import { rateRoutes } from './src/routes/Rate.route.js'
import { pairRoutes } from './src/routes/Pair.route.js'
import { connectToDatabase } from './database.js'
import Inert from '@hapi/inert'
import HapiSwagger from 'hapi-swagger'
import Vision from '@hapi/vision'
import { healthRoutes } from './src/routes/Health.route.js'

dotenv.config()

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
})

server.events.on('response', function (request) {
    request.log(
        request.info.remoteAddress +
            ': ' +
            request.method.toUpperCase() +
            ' ' +
            request.route.path +
            ' --> ' +
            request.response.statusCode
    )
})

const swaggerOptions = {
    info: {
        title: 'Test API Documentation',
        version: '1',
    },
}

server.route(rateRoutes)
server.route(pairRoutes)
server.route(healthRoutes)

export const init = async () => {
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ])
    await server.initialize()
    return server
}

export const start = async () => {
    await connectToDatabase()
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
    return server
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

/*
const init = async () => {


    //TODO: Add logger



    await server.start();

    console.log('Server running on %s', server.info.uri);
}

init();  */
