//let PROVIDER_URL = process.env.ETH_PROVIDER_URL;
// this.infuraApiKey = process.env.INFURA_API_KEY;
// const INFURA_API_KEY = 'ff1a4d33dfe64055b03d770d91788f61';
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const PROVIDER_URL = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;
const DEFAULT_ADDRESS = "0xACfC44f9AC805aB09B92656b299fFAFFD2439177";
let GWEI = 10**9;
let GAS_PRICE = 70*GWEI;

let GAS_LIMIT = 21000;
//const Transaction = require('ethereumjs-tx');

const Web3 = require('web3');
const EthConverter = require('/src/helpers/EthConverter');
const Validator = require('/src/validators/blockchain/EthValidator');

//const AbstractCurrencyLab = require('/src/core/blockchain/AbstractCurrencyLib')
class EthLib {
    constructor(app) {
        this.provider = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
        this.converter = new EthConverter();
        this.validator = new Validator();
        this.app = app;

    }

    _getChainId(){
        return 11155111;
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(DEFAULT_ADDRESS);
            }catch (e){
                return reject(e);
            }
        })
    }
    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateAddress(address);
                let balance =await this.provider.eth.getBalance(address);
                balance = this.converter.toDecimals(balance);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log("EthLib.sendCurrency ",to,amount);
                this.validator.validateAddress(to,"Tx Receiver");
                this.validator.validateNumber(amount,"sendCurrency amount");

                alert("Transactions are disabled");
                return reject();
                this.validator.validateAddress(to,"Tx Receiver");
                this.validator.validateNumber(amount,"sendCurrency amount");
                let txData = await this._formatTransactionParams(to,amount);
                let hash = await this._makeTransaction(txData);
                return resolve(hash);
            }catch (e){
                return reject(e);
            }
        });
    }

    _formatTransactionParams(to,value,data=""){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateAddress(to);
                this.validator.validateNumber(value);
                this.validator.validateString(data);

                let privateKey = await this.getPrivateKey();
                this.validator.validateString(privateKey);

                let privKeyBuffer=Buffer.from(privateKey,'hex');
                let from = await this.getAddress();
                let nonce = await this.getNextNonce();
                this.validator.validateAddress(from);
                this.validator.validateNumber(nonce);

                let gasPrice = this.getGasPrice();
                //this.validator.validateNumber(gasPrice);

                let gasLimit = this.getGasLimit();
                //this.validator.validateNumber(gasLimit);

                value = this.fromDecimals(value);
                let chainId = this._getChainId();
                //this.validator.validateNumber(chainId);
                let txParams = {
                    "from":from,
                    "to":to,
                    "privateKey":privKeyBuffer,
                    "value":this.provider.utils.numberToHex(value),
                    "gasPrice":this.provider.utils.numberToHex(gasPrice),
                    "gasLimit":gasLimit,
                    "nonce":nonce,
                    "data":data,
                    "chainId":chainId
                };
                console.log('txParams',txParams)
                return resolve(txParams);
            }catch (e){
                return reject(e);
            }
        })
    }

    getGasPrice(){
        return GAS_PRICE;
    }

    getGasLimit(){
        return GAS_LIMIT;
    }
    getNextNonce(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();
                let nonce =await this.provider.eth.getTransactionCount(address);
                return resolve(nonce);
            }catch (e){
                return reject(e)
            }
        });
    }
    _makeTransaction(txParams){
        return new Promise(async (resolve,reject)=>{
            try{
                let tx = new Transaction(txParams);
                console.log(tx);
                tx.sign(txParams.privateKey);
                var raw = "0x"+tx.serialize().toString('hex');

                this.provider.eth.sendSignedTransaction(raw).on("receipt",(data)=>{
                    console.log(data);
                    let transactionHash = data["transactionHash"];
                    return resolve(transactionHash);
                }).on("error",(e)=>{
                    console.error(e);
                    return reject(e);
                });

            }catch(e){
                return reject(e);
            }
        });
    }
}
module.exports = EthLib;