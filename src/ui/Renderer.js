// відповідає за рендер елементів в додатку

class Renderer{

    constructor(app) {
        this.app = app
    }
    renderUI(){
        this.renderCurrency();
        this.renderBalance();
        this.renderAddress();
    }
    renderCurrency(){
        let currency = this.app.getCurrency();
        let elements = document.getElementsByClassName("currency_symbol");
        //for loop
        for(let i=0; i<elements.length;i++){
            let element = elements[i];
            element.innerHTML=currency;
        }
    }

    renderBalance(){
        this.app.getCurrentBalance().then((balance)=>{
            let element = document.getElementById("balance");
            element.innerHTML=balance;
        }).catch((e)=>{
            console.error(e);
        });
    }

    renderAddress(){
        this.app.getAddress().then((address)=>{
            let element = document.getElementById("address");
            element.innerHTML=address;
        }).catch((e)=>{
            console.error(e);
        });
    }
}

module.exports = Renderer;