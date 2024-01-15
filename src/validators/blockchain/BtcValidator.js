const wallet_validator= require('wallet-address-validator');
const AbstractCurrencyValidator= require('./AbstractCurrencyValidator');
class BtcValidator extends AbstractCurrencyValidator{
    validateAddress(address){
        console.log("btcValidator validateAddress",address)
        if(!wallet_validator.validate(address,'BTC',"both")){
            throw new Error('Invalid Bitcoin Address');
        }
    }
}

module.exports = BtcValidator;