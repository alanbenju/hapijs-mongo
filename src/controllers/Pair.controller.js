import { PairService } from '../services/Pair.service'

export const PairController = {
    findAll: async function () {
        return await PairService.findAll()
    },
    add: async function (req, h) {
        const { base,symbols } = req.payload //TODO: validate in middleware/joi
        //TODO: check base already exist
        try {
            const result = await PairService.add(base, symbols)
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
    update: async function (req, h) {
        const { base } = req.params
        const { symbols } = req.payload //TODO: validate in middleware/joi
        try {
            const result = await PairService.update(base, symbols)
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
