const AbstractCurrencyWallet = require('/src/blockchain/credentials/protocols/AbstractCurrencyWallet');
const {payments,networks}= require('bitcoinjs-lib');
const BtcNetworkHelper = require("/src/blockchain/btc/BtcNetworkHelper");
const bip39 = require("bip39");
const bip32 = require("bip32");
class BtcWallet extends AbstractCurrencyWallet{

    _getPath(){
        return BtcNetworkHelper.isMainnet()?`m/44'/0'/0'/0/0`:`m/44'/1'/0'/0/0`;
    }
    _getNetwork(){
        return BtcNetworkHelper.getNetwork();
    }
    provideAddress(mnemonic) {
        return new Promise(async(resolve,reject)=>{
            try {
                let child = await this._getPrivateKey(mnemonic);
                const { address } = payments.p2wpkh({ pubkey: child.publicKey, network: this._getNetwork() });
                return resolve(address);
            } catch (e) {
                return reject(e);
            }
        })
    }
    providePrivateKey(mnemonic) {
        return new Promise(async(resolve,reject)=>{
            try {
                let child = await this._getPrivateKey(mnemonic);
                const privateKey = child.toWIF();
                return resolve(privateKey);
            } catch (e) {
                return reject(e)
            }
        })
    }

    _getPrivateKey(mnemonic){
        return new Promise(async(resolve,reject)=>{
            try {
                const seed = await bip39.mnemonicToSeed(mnemonic);
                const root = bip32.fromSeed(seed, this._getNetwork());
                const child = root.derivePath(this._getPath());
                return resolve(child);
            } catch (e) {
                return reject(e)
            }
        })
    }

}

module.exports = BtcWallet;