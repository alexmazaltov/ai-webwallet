const EthLib = require('./eth/EthLib');

class BlockchainService {

    constructor(app) {
        this.app = app;
        let eth = new(EthLib);
        this.currencyLibraries = {
            ETH: eth,
            ERC20: eth,
            BTC: eth,
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

    sendCurrency(){
      let _address = document.getElementById('recipientAddress').value;
      let _amount = document.getElementById('amount').value;
      let currency = this.app.getCurrency();
      alert(`Sending ${_amount} ${currency} to ${_address}`);
    }    
}

module.exports = BlockchainService;