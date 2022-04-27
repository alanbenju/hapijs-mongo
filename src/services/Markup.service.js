const defaultMarkupFeePercentage = 2
export const MarkupService = {
    /**
     *
     * @param {*} oldRate: rate model (optional)
     * @param {*} newValue: new value for rate pair
     * @param {*} markupFeePercentage: (optional)
     */
    getRateWithNewFees: function (oldRate, newValue, markupFeePercentage) {
        console.log(oldRate, newValue, markupFeePercentage)
        let rate = { rate: newValue, pair: oldRate.pair }
        rate.feePercentage = markupFeePercentage
            ? markupFeePercentage
            : oldRate.feePercentage || defaultMarkupFeePercentage
        rate.feeAmount = (newValue * rate.feePercentage) / 100
        rate.markupRate = newValue + rate.feeAmount
        return rate
    },
}
