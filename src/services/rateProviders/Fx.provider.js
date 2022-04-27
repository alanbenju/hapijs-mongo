import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

/**
 * 
 * @param {*} pair  {base: USD, symbols:[ARS, EUR]}
 * result: {
    "success": true,
    "timestamp": 1519296206,
    "base": "USD",
    "date": "2022-04-23",
    "rates": {
        "GBP": 0.72007,
        "JPY": 107.346001,
        "EUR": 0.813399,
    }
    return response: {
        rates
        base
    }
}   
 */
async function getLatestRates(pair) {
    try {
        const result = await axios.get(
            process.env.FX_URL +
                'latest?access_key=' +
                process.env.FX_ACCESS_KEY +
                '&base=' +
                pair.base +
                '&symbols=' +
                pair.symbols
        )
        if (!result?.data?.success) {
            console.log("Unable to retrieve pair from FX", pair)
            return null
        }
        const { base, rates } = result.data
        return { base, rates }
    } catch (err) {
        console.log('Error getting rates from FX', err)
        return null
    }
}

export const fxProvider = {
    getLatestRates,
}
