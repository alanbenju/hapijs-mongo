import mongoose from 'mongoose'
const Schema = mongoose.Schema

let RateSchema = new Schema(
    {
        pair: { type: String, required: true },
        rate: 'number',
        feePercentage: 'number',
        feeAmount: 'number',
        markupRate: 'number',
    },
    {
        timestamps: true,
    }
)

const model = mongoose.model('Rate', RateSchema)

class RateModel {
    async findAll() {
        return model.aggregate([
            { $group: { _id: '$pair', doc: { $last: '$$ROOT' } } },
            { $replaceRoot: { newRoot: '$doc' } },
        ])
    }
    /**
     * @param {*} pair: "EURUSD"
     */
    async findOneByPair(pair) {
        return model.findOne({ pair })
    }
    async addOne(rate) {
        // TODO: validate schema
        return model.create(rate)
    }
}

const Rate = new RateModel()
export default Rate
