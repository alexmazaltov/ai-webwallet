const Validator = require('/src/validators/Validator');
const staticValidator = new Validator();
class AbstractCurrencyLib{
    constructor(app,provider,validator,converter) {
        this.app = app;
        staticValidator.validateObject(provider,"provider");
        staticValidator.validateObject(validator,"validator");
        staticValidator.validateObject(converter,"converter");
        this.provider = provider;
        this.validator = validator;
        this.converter = converter;
    }

    getBlockchainService(){
        return this.app.blockchainService;
    }
    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = this.getBlockchainService().getAddress();
                return resolve(address);
            }catch (e){
                return reject(e);
            }
        })
    }
    getPrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try{
                let privKey = this.getBlockchainService().getPrivateKey();
                return resolve(privKey);
            }catch (e){
                return reject(e);
            }
        })
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();
                let balance =await this.getBalance(address);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }
    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                throw("getBalance() not implemented")
            }catch (e){
                return reject(e);
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                throw("sendCurrency() not implemented")
            }catch (e){
                return reject(e);
            }
        });
    }

    toDecimals(amount){
        return this.converter.toDecimals(amount);
    }
    fromDecimals(amount){
        return this.converter.fromDecimals(amount);
    }
}

module.exports = AbstractCurrencyLib;