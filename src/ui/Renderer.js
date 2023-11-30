const Web3 = require('web3');

class Renderer {

    constructor(app) {
        this.app = app;
    }
    
    renderUI() {
        this.renderCurrency();
        this.renderBalance();
        this.renderAddress();
    }

    renderCurrency() {
        // console.log("Renderer->renderCurrency(): here");
        let currency = this.app.getCurrency();
        let elements = document.getElementsByClassName("currency-symbol");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = currency;
        }
    }

    renderBalance(){
        // console.log("Renderer->renderBalance(): here");
        this.app.getBalance().then((balance) => {
            let element = document.getElementById("balance");
            element.innerHTML = balance;
        })
        .catch(error => {
            console.error(error)
            // Display error message on the page
            document.body.innerHTML += `<p>Error retrieving balance: ${error}</p>`;
        });
    }

    renderAddress() {
        this.app.getAddress().then((address) => {
            let element = document.getElementById("address");
            element.innerHTML = address;
        })
            .catch(error => {
                console.error(error);
            });
    }
}

module.exports = Renderer;