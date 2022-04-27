import { start } from './server'
import { init } from './server'
const initializeServer = async () => {
    await init()
    await start()
}

initializeServer()
