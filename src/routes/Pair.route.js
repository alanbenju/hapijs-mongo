import Joi from 'joi'
import { PairController } from '../controllers/Pair.controller'

export const pairRoutes = [
    {
        method: 'POST',
        path: '/pairs',
        options: {
            description: 'Create a new pair',
            notes: 'Create a new pair given the base and symbols',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    base: Joi.string()
                        .required()
                        .description('Base for pair item'),
                    symbols: Joi.array()
                        .items(Joi.string().required())
                        .description('Symbols for base'),
                }),
            },
            //TODO: Response joi object of a new pair
        },
        handler: PairController.add,
    },
    {
        method: 'GET',
        path: '/pairs',
        options: {
            description: 'Get all pairs',
            notes: 'Returns all pairs',
            tags: ['api'],
            //TODO: Response joi object list of pairs
        },
        handler: PairController.findAll,
    },
    {
        method: 'PUT',
        path: '/pairs/{base}',
        options: {
            description: 'Update existing pair',
            notes: 'Update a new pair given the base',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    base: Joi.string()
                        .required()
                        .description('Base for pair item'),
                }),
                payload: Joi.object({
                    symbols: Joi.array()
                        .items(Joi.string().required())
                        .description('Symbols for base'),
                }),
            },
            //TODO: Response joi object of a new pair
        },
        handler: PairController.update,
    },
]
