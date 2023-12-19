const isProduction = false;// require('/src/isProduction'); // TODO
class AbstractNetworkHelper{
    static isMainnet(){
        return isProduction;
    }
    static getMainnet(){
        throw "getMainnet() not implemented";
    }

    static getTestnet(){
        throw "getTestnet() not implemented";
    }

    static getNetwork(){
        if(isProduction){
            return this.getMainnet();
        }else{
            return this.getTestnet();
        }
    }
}

module.exports = AbstractNetworkHelper;