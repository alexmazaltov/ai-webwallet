const Validator = require('/src/validators/blockchain/EthValidator');
const staticValidator = new Validator();

class AbstractCurrencyLib {
    constructor(app, provider, validator, converter) {
        this.app = app;
        staticValidator.validateObject(provider, 'provider');
        staticValidator.validateObject(validator, 'validator');
        staticValidator.validateObject(converter, 'converter');
        this.setProvider(provider);
        this.setValidator(validator);
        this.setConverter(converter);
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                throw('sendCurrency() not implemented');
            } catch (e) {
                reject(e);
            }
        });
    }

    getCurrentBalance() {
        return new Promise(async(resolve, reject) => {
            try {
                let address = await this.getCurrentAddress();
                let balance = await this.getBalance(address);
                return resolve(balance);
            } catch (e) {
                reject(e);
            }
        });
    }

    getBalance(address) {
        return new Promise(async(resolve, reject) => {
            try {
                this.getValidator().validateAddress(address);
                let balance = await this.getProvider().eth.getBalance(address);
                balance = this.toDecimal(balance);
                return resolve(balance);
            } catch (e) {
                reject(e);
            }
        });
    }

    getCurrentAddress() {
        return new Promise(async(resolve, reject) => {
            try {
                throw('getCurrentAddress() not implemented');
            } catch (e) {
                reject(e);
            }
        });
    }

    getCurrentPrivateKey() {
        return new Promise(async(resolve, reject) => {
            try {
                throw('getCurrentPrivateKey() not implemented');
            } catch (e) {
                reject(e);
            }
        });
    }

    toDecimals(amount) {
        return this.getConverter().toDecimals(amount);
    }

    fromDecimals(amount) {
        return this.getConverter().fromDecimals(amount);
    }

    getProvider() {
        return this.provider;
    }

    setProvider(provider) {
        this.provider = provider;
    }

    getValidator() {
        return this.validator;
    }

    setValidator(validator) {
        this.validator = validator;
    }

    getConverter() {
        return this.converter;
    }

    setConverter(converter) {
        this.converter = converter;
    }
}

module.exports = AbstractCurrencyLib;