class WalletUI {
    
    constructor(app, renderer, listenerManager) {
        this.app =  app;
        this.renderer = renderer;
        this.listenerManager = listenerManager;
    }

    prepareUI(){
        console.log('prepare UI');
        this.renderUI();
        this.setListeners();
    }

    renderUI() {
        this.getRenderer().renderUI();
    }

    setListeners() {
        this.getListenerManager().setListeners();
    }
    getListenerManager(){
        return this.listenerManager;
    }

    getRenderer(){
        return this.renderer;
    }
}

module.exports = WalletUI;