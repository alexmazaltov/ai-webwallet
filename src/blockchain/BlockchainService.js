const EthLib = require('./eth/EthLib');
const Erc20Lib = require("./erc20/Erc20Lib");
const BtcLib = require("./btc/BtcLib");

class BlockchainService {

    constructor(app) {
        this.app = app;
        let eth = new EthLib(app);
        let erc20 = new Erc20Lib(app);
        let btc = new BtcLib(app);
        this.currencyLibraries = {
            ETH: eth,
            ERC20: erc20,
            BTC: btc,
            LTC: eth,
            BNB: eth,
            DOT: eth
        }
    }

    getCurrencyLibrary() {
        let currentCurrency = this.app.getCurrency();
        return this.currencyLibraries[currentCurrency];
    }

    getAddress(){
        return new Promise(async(resolve, reject) => {
            try {
                let address = this.getCurrencyLibrary().getAddress();
                return resolve(address);
            } catch(e) {
                return reject(e);
            }
        });
    }

    getBalance(){
      return new Promise(async (resolve, reject) => {
          try {
              let address = await this.getAddress();
              let balance = await this.getCurrencyLibrary().getBalance(address);
              return resolve(balance);
          } catch(e) {
              reject(e);
          }
      })
    }

    setBalance(balance){
      this.balance = balance;
    }

    async sendCurrency(){
      let _address = document.getElementById('recipientAddress').value;
      let _amount = document.getElementById('amount').value;
      let currency = this.app.getCurrency();
      // alert(`Sending ${_amount} ${currency} to ${_address}`);
      let hash = await this.getCurrencyLibrary().sendCurrency(_address, _amount);
      console.log('Transaction hash:', hash);
      alert(hash);
    }    
}

module.exports = BlockchainService;