import mongoose from 'mongoose'
const Schema = mongoose.Schema

let PairSchema = new Schema(
    {
        base: { type: String, required: true, unique: true, index: true },
        symbols: 'array',
    },
    {
        timestamps: true,
    }
)

const model = mongoose.model('Pair', PairSchema)

class PairModel {
    async findAll() {
        return await model.find()
    }
    async addOne(base, symbols) {
        // TODO: Validate schema
        return await model.create({ base, symbols })
    }
    async updateSymbols(base, symbols) {
        // TODO: Validate schema
        return await model.updateOne({ base }, { symbols })
    }
}

const Pair = new PairModel()
export default Pair
