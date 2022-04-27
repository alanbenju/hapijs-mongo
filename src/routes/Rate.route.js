import Joi from 'joi'
import { RateController } from '../controllers/Rate.controller'

export const rateRoutes = [
    {
        method: 'PUT',
        path: '/rates',
        options: {
            description: 'Update all rates',
            notes: 'Updates all rates and markup fees bases on a provider',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    provider: Joi.string().description('Rates provider'),
                    markupFeePercentage: Joi.number(),
                }),
            },
            //TODO: Response joi object of same response interface that should be used through the whole app
        },
        handler: RateController.update,
    },
    {
        method: 'GET',
        path: '/rates',
        options: {
            description: 'Get all rates',
            notes: 'Return all rates',
            tags: ['api'],
            //TODO: Response joi object list of rates
        },
        handler: RateController.findAll,
    },
]
