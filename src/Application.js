const NODE_ENV = process.env.NODE_ENV;
console.log("NODE_ENV "+NODE_ENV)
const DEFAULT_CURRENCY = "ETH";
const Renderer = require("./ui/Renderer");
const ListenerManager = require("./ui/ListenerManager");
const WalletUI = require("./ui/WalletUI");
const HttpService = require("./services/HttpService");
const BlockchainService = require('./blockchain/BlockchainService');

class Application{

    constructor() {
        this.currency = DEFAULT_CURRENCY;
        this.httpService = new HttpService(this);
        let renderer = new Renderer(this);
        let listenerManager = new ListenerManager(this);
        let walletUi = new WalletUI(this,listenerManager,renderer);
        this.setWalletUI(walletUi);
        let blockchainService = new BlockchainService(this);
        this.blockchainService = blockchainService;
    }

    isProduction(){
        return NODE_ENV == "production";
    }

    setWalletUI(walletUi){
        this.walletUi = walletUi;
    }

    getWalletUi(){
        return this.walletUi;
    }

    prepareUI(){

        this.walletUi.prepareUI();
    }
    getCurrency(){
        return this.currency;
    }

    changeCurrency(currency){
        this.setCurrency(currency);
        // changed prepareUI to renderUI to avoid duplicating listeners, only re-render
        this.getWalletUi().renderUi();
    }

    setCurrency(currency){
        this.currency = currency;
    }

    sendCurrency(receiver,amount){
        return this.blockchainService.sendCurrency(receiver,amount);
    }


    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.blockchainService.getAddress();
                return resolve(result);
            }catch (e){
                console.error(e);
                return reject(e);
            }
        })
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.blockchainService.getCurrentBalance();
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }

    generateMnemonic(){
        return this.blockchainService.generateMnemonic();
    }

    importMnemonic(mnemonic){
        this.blockchainService.importMnemonic(mnemonic);
        this.walletUi.renderUi();
    }
}

module.exports = Application;