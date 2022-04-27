import Pair from '../models/Pair.model'

export const PairService = {
    findAll: async function () {
        return await Pair.findAll()
    },
    add: async function (base, symbols) {
        return await Pair.addOne(base, symbols)
    },
    update: async function (base, symbols) {
        return await Pair.updateSymbols(base, symbols)
    },
}
