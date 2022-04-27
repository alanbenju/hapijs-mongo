var mockRates = [{ test: 'test' }]
var mockRate = {
    pair: 'EURARS',
    rate: '100',
    feePercentage: '2',
    feeAmount: '2',
    markupRate: '102',
}
var mockPairs = [{ base: 'EUR', symbols: ['ARS'] }]

var mockAddOneRate = jest.fn().mockImplementation(async () => {})

export { mockRate, mockRates, mockPairs, mockAddOneRate }
