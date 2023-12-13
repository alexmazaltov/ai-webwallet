const Converter = require('./Converter');
class Erc20Converter extends Converter{
    setDecimals(decimals){
        this.decimals = decimals;
    }
    getDecimals(){
        return this.decimals;
    }
    toDecimals(amount) {
        return super.toDecimals(amount, this.getDecimals());
    }

    fromDecimals(amount) {
        return super.fromDecimals(amount, this.getDecimals());
    }
}

module.exports = Erc20Converter;