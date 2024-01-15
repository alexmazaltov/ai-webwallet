// відповідає за отримання балансу, за отримання адреси і за надсилання транзакцій
const EthLib = require("./eth/EthLib");
const Erc20Lib = require("./erc20/Erc20Lib");
const BtcLib = require("./btc/BtcLib");
const CredentialService = require("./credentials/CredentialService");

class BlockchainService{
    constructor(app) {
        this.app = app
        this.credentials = new CredentialService(app);
        let eth = new EthLib(app);
        let erc20 = new Erc20Lib(app);
        let btc = new BtcLib(app);
        this.currencyLibraries = {
            ETH:eth,
            ERC20:erc20,
            BTC:btc
        }
    }
    getCurrencyLibrary(){
        let currentCurrency = this.app.getCurrency();
        return this.currencyLibraries[currentCurrency];
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance = await this.getCurrencyLibrary().getCurrentBalance();
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address =await this.getCredentials().getAddress();
                return resolve(address);
            }catch (e){
                return reject(e);
            }
        })
    }

    getPrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try{
                let privKey =await this.getCredentials().getPrivateKey();
                return resolve(privKey);
            }catch (e){
                return reject(e);
            }
        })
    }

    //
    sendCurrency(receiver,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.getCurrencyLibrary().sendCurrency(receiver,amount);
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }

    getCredentials(){
        return this.credentials;
    }

    generateMnemonic(){
        return this.getCredentials().generateMnemonic();
    }

    importMnemonic(mnemonic){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.getCredentials().importMnemonic(mnemonic);
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }
}

module.exports = BlockchainService;