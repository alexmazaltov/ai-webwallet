// відповідає за роботу рендерера та ListenerManager'a
class WalletUI{

    constructor(app,listenerManager,renderer){
        this.app = app;
        this.listenerManager = listenerManager;
        this.renderer = renderer;
    }

    prepareUI(){
        console.log("walletUi prepareUi")
        this.renderUi();
        this.setListeners()
    }

    renderUi(){
        this.getRenderer().renderUI();
    }

    setListeners(){
        this.getListenerManager().setListeners()
    }
    getListenerManager(){
        return this.listenerManager;
    }

    getRenderer(){
        return this.renderer;
    }
}

module.exports = WalletUI;