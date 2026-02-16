
class eventManager{
    static instance
    constructor(){
        this.listeners = []
    }

    static getInstance(){
        if(!eventManager.instance) eventManager.instance = new eventManager
        return instance
    }
}