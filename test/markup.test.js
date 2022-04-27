import { init } from '../server'
import nock from 'nock'
import { mockAddOneRate, mockPairs, mockRate, mockRates } from './mocks'

jest.mock('../src/models/Rate.model', () => ({
    findAll: jest.fn().mockImplementation(async () => mockRates),
    findOneByPair: jest.fn().mockImplementation(async () => mockRate),
    addOne: jest.fn().mockImplementation(async (p1) => mockAddOneRate(p1)),
}))

jest.mock('../src/models/Pair.model', () => ({
    findAll: jest.fn().mockImplementation(async () => mockPairs),
}))

describe('Rates tests', () => {
    let server

    beforeAll(async () => {
        server = await init()
    })

    test('Find all rates', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/rates',
        })

        expect(response.statusCode).toBe(200)
        expect(response.result).toStrictEqual(mockRates)
    })

    test('Update rates with existing rate and pair with no errors ', async () => {
        nock('http://data.fixer.io/api')
            .get(
                `/latest?access_key=${process.env.FX_ACCESS_KEY}&base=${mockPairs[0].base}&symbols=${mockPairs[0].symbols}`
            )
            .reply(200, {
                success: true,
                timestamp: 1519296206,
                base: 'EUR',
                date: '2022-04-23',
                rates: {
                    ARS: 101,
                },
            })

        const response = await server.inject({
            method: 'PUT',
            url: '/rates',
            payload: {
                provider: 'FX',
                markupFeePercentage: 2,
            },
        })

        expect(response.statusCode).toBe(200)
        expect(response.result).toStrictEqual({ success: true })
        expect(mockAddOneRate).toHaveBeenCalledWith({
            feeAmount: 2.02,
            feePercentage: 2,
            markupRate: 103.02,
            pair: 'EURARS',
            rate: 101,
        })
    })

    // TODO: Update rates with rate that doesn't exist
    // TODO: Tests with more currencies and pairs
})
