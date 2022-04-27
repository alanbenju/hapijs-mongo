import Pair from '../models/Pair.model'
import Rate from '../models/Rate.model'
import { MarkupService } from './Markup.service'
import { fxProvider } from './rateProviders/Fx.provider'

const _providers = { fx: fxProvider }

export const RateService = {
    findAll: async function () {
        return await Rate.findAll()
    },
    updateRates: async function (provider, markupFeePercentage) {
        const pairs = await Pair.findAll()
        console.log(
            'Update pairs with markup fee percentage',
            markupFeePercentage
        )
        const selectedProvider = _providers[provider] || fxProvider
        let allLatestRatesPromises = []
        pairs.forEach((pair) => {
            const latestRatesPromise = selectedProvider.getLatestRates(pair)
            allLatestRatesPromises.push(latestRatesPromise)
        })
        // Accepting the fact that if one fails, the promises won't be fulfilled
        const responses = await Promise.all(allLatestRatesPromises)
        let response = {
            success: true,
        }
        for (let latestRateForPair of responses) {
            if (latestRateForPair){
                const newRates = latestRateForPair.rates
            for (let currency of Object.keys(newRates)) {
                const pair = `${latestRateForPair.base}${currency}`
                let rate = await Rate.findOneByPair(pair)
                if (!rate) rate = { pair }
                const updatedRate = MarkupService.getRateWithNewFees(
                    rate,
                    newRates[currency],
                    markupFeePercentage
                )
                await Rate.addOne(updatedRate)
            }
            }
            else response.msg = "Some of the rates couldn't be updated"
        }
        return response
    },
}
