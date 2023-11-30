class WalletUI {
    
    constructor(app, renderer, listenerManager) {
        this.app =  app;
        this.renderer = renderer;
        this.listenerManager = listenerManager;
    }

    prepareUI(){
        this.renderer.renderUI();
        this.listenerManager.setListeners();
    }

    getListenerManager(){
        return this.listenerManager;
    }

    getRenderer(){
        return this.renderer;
    }
}

module.exports = WalletUI;