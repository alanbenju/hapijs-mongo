import { RateService } from '../services/Rate.service'

export const RateController = {
    findAll: async function (req, h) {
        try {
            const result = await RateService.findAll()
            return h.response(result).code(200)
        } catch (err) {
            console.log('Error finding rates', err)
            req.log(err)
            return h
                .response({
                    success: false,
                    err,
                })
                .code(500)
        }
    },
    update: async function (req, h) {
        const { provider, markupFeePercentage } = req.payload
        try {
            const result = await RateService.updateRates(
                provider,
                markupFeePercentage
            )
            return h.response(result).code(200)
        } catch (err) {
            req.log(err)
            return h
                .response({
                    success: false,
                    err,
                })
                .code(500)
        }
    },
}
