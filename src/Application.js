const DEFAULT_CURRENCY = "ETH";

const Renderer = require('./ui/Renderer');
const ListenerManager = require('./ui/ListenerManager');
const WalletUI = require('./ui/WalletUI');
const BlockchainService = require('./blockchain/BlockchainService');

class Application {

    constructor() {
        let renderer = new Renderer(this);
        let listenerManager = new ListenerManager(this);
        let walletUI = new WalletUI(this, renderer, listenerManager);
        this.setWalletUI(walletUI);
        let blockchainService = new BlockchainService(this);
        this.setBlockchainService(blockchainService);
        this.currency = DEFAULT_CURRENCY;
    }
    
    setWalletUI(walletUI) {
        this.walletUI = walletUI;
    }

    getWalletUI() {
        return this.walletUI;
    }

    setBlockchainService(blockchainService){
        this.blockchainService = blockchainService;
    }

    getBlockchainService(){
        return this.blockchainService;
    }

    getCurrency() {
        return this.currency;
      }
  
    changeCurrency(currency){
        // console.log("App->changeCurrency(): here")
        this.setCurrency(currency);
        this.getWalletUI().getRenderer().renderUI();
    }

    setCurrency(currency){
        this.currency = currency;
    }

    prepareUI(){
        this.getWalletUI().prepareUI();
    }

    sendCurrency(){
        return this.getBlockchainService().sendCurrency();
    }

    getAddress(){
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getBlockchainService().getAddress();
                return resolve(address);
            } catch(error) {
                console.error(error);
                return reject(error)
            }
        })

    }

    getBalance(){
        return this.getBlockchainService().getBalance();
    }

    setBalance(new_balance) {
        this.getBlockchainService().setBalance(new_balance);
    }
}

module.exports = Application;