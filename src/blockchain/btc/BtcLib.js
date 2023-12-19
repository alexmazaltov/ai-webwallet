const {ECPair, TransactionBuilder, networks} = require('bitcoinjs-lib');

const PRIVATE_KEY = process.env.BTC_PRIVATE_KEY;
const WIF = process.env.BTC_WIF;
const ADDRESS = process.env.BTC_ADDRESS;
const AbstractCurrencyLib = require('/src/blockchain/AbstractCurrencyLib')

const BtcValidator = require('/src/validators/blockchain/BtcValidator');
const BtcConverter = require('/src/helpers/BtcConverter');
const BlockcypherProvider = require('/src/blockchain/btc/BtcBlockcypherProvider');
const BtcNetworkHelper = require('/src/blockchain/btc/BtcNetworkHelper');
class BtcLib extends AbstractCurrencyLib {

    constructor(app) {
        let validator = new BtcValidator();
        let converter = new BtcConverter();
        console.log('BtcLib -> constructor() app: ', app);
        let provider = new BlockcypherProvider(app,validator,converter);
        super(app, provider, validator, converter);
    }

    getNetwork(){
        return BtcNetworkHelper.getNetwork();
    }

    getPrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(PRIVATE_KEY);
            }catch (e){
                return reject(e);
            }
        })
    }

    getWif(){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(WIF);
            }catch (e){
                return reject(e);
            }
        })
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(ADDRESS);
            }catch (e){
                return reject(e);
            }
        })
    }

    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateAddress(address);
                let balance = await this.provider.getBalance(address);
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
                let txParams = await this._formatTransactionParameters(to,amount);
                let currentBalance = await this.getBalance(await this.getAddress());
                // console.log('txParams["amount"]+txParams["fee"]: ', txParams["amount"],txParams["fee"]);
                // console.log('currentBalance: ', Math.round(this.fromDecimals(currentBalance)));
                if (txParams["amount"]+txParams["fee"] > this.fromDecimals(currentBalance)) {
                    throw('Your balance is less then amount + fee. Can\'t proceed');
                }
                let rawTx = await this._createSignRawTx(txParams);
                let txHash = await this.provider.sendTx(rawTx);
                return resolve(txHash);
            }catch (e) {
                return reject(e)
            }
        })
    }

    _createSignRawTx(txParams){
        return new Promise(async(resolve,reject)=>{
            try {
                let privKey = await this.getPrivateKey();
                let wif = await this.getWif();
                let keyring = await ECPair.fromWIF(wif,this.getNetwork());
                let txb = new TransactionBuilder(this.getNetwork());
                txb = await this.provider.addSignedUtxos(keyring,txb,txParams["from"],txParams["to"],txParams["amount"],txParams["fee"]);
                let txHash = txb.build().toHex();
                this.validator.validateString(txHash,'txHash');
                return resolve(txHash)
            }catch (e){
                return reject(e);
            }
        })
    }


    _formatTransactionParameters(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                let from = await this.getAddress();
                let fee = await this.getFee();
                amount = parseFloat(amount);
                this.validator.validateAddress(to);
                this.validator.validateNumber(amount);
                this.validator.validateNumber(fee);
                amount = this.fromDecimals(amount);
                fee = this.fromDecimals(fee);
                amount = Math.round(amount);
                fee = Math.round(fee);
                let txParams={
                    from:from,
                    to:to,
                    amount:amount,
                    fee:fee
                }
                return resolve(txParams);
            }catch (e){
                return reject(e);
            }
        })
    }


    getFee(){
        return new Promise(async(resolve,reject)=>{
            try{
                let fee = await this.provider.getFee()
                return resolve(fee);
            }catch(e){
                return reject(e)
            }
        })
    }

}

module.exports = BtcLib;