import { init } from '../server'

describe('All tests', () => {
    let server

    beforeAll(async () => {
        server = await init()
    })

    test('Healthcheck respond correctly', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/',
        })

        expect.assertions(1)
        expect(response.statusCode).toBe(200)
    })
})
