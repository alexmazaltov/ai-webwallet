class ListenerManager {

    constructor(app) {
        this.app = app;
    }
    
    setListeners(){
        this.setChangeCurrencyListener();
        this.setSendCurrencyListener();
      }
  
    setChangeCurrencyListener() {
        let elements = document.getElementsByClassName("currency-container");
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", (e) => {
                let element = e.target;
                if (element.tagName === 'LI') {
                  // Make element to reference child 'A' tag with class nav-link
                  element = element.querySelector('a.nav-link');
                }
                let currency = element.getAttribute('data-value');
                this.app.changeCurrency(currency);
            });
        }
    } 

    setSendCurrencyListener() {
        document.getElementById("send-button").addEventListener("click", (e) => {
            e.preventDefault();
            this.app.sendCurrency();
        });
    }    
}

module.exports = ListenerManager;