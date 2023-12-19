# History

## v3

1. Initialise git repository
2. Configure `.gitignore` file to prevent sensitive information going to public
3. Generate npm project
4. Configure webpack to handle app architecture
5. Put web-wallet source code
6. Update ddev and configure
7. Add npm dependency for web3 library
8. Connect "Infura" service to deal with blockchain networks
   * TODO:
     * Create api endpoint on my server alefinvest.xyz to retrieve sensetive information
     * It should be secure endpoint with auth endpoint.
9. Push current version to private repo
10. Update source code 
    * update BlockchainService -> getAddress()
    * update BlockchainService -> getBalance()
    * renderAddress() for real
    * make renderBalance async

## v4

1. Add webpack.config.js to support variable declaration in .env file
   * `npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env dotenv-webpack path`
2.  Inherit EthLib from AbstractCurrencyLib
3. `npm i node-polyfill-webpack-plugin` and adjust webpack.config.js accordingly to: https://stackoverflow.com/a/65556946
4. Adjust `package.json` scripts: add `  "build": "webpack --config webpack.config.js --mode development --progress"` 
5. Add ETH token support

## v5-erc20

1. Add ERC20 token support

## v6-btc-01

1. Add btc support
   * Get token for API https://accounts.blockcypher.com/tokens
   * Get btc **BIP84** in **Bitcoin testnet** address on https://iancoleman.io/bip39/#english
   * Add variables to .env file:
     * BTC_ADDRESS
     * BTC_PUBLIC_KEY
     * BTC_PRIVATE_KEY
     * BLOCKCYPHER_PROVIDER_URL='https://api.blockcypher.com/v1/'
     * BLOCKCYPHER_PROVIDER_TOKEN
   * add npm dep 'wallet-address-validator', 'bitcoinjs-lib'
   * Add btc library ...