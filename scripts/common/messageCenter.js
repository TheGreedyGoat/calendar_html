/**
 * WIP - Dynamische Zuweisung von Funktionen zu Nachrichtentypen
 */
class MessageHandler {

    constructor() {
        this.msgCallbacks = {};
        this.clickCallbacks = {};
        this.addCallback('click', this.processClick.bind(this));

        window.addEventListener('message', (event) => {
            this.processMessage(event.data);
        });
    }

    //=================================RECIEVE=========================================//
    /**
     * 
     * @param {string} messageType 
     * @param {function} callback 
     */
    addCallback(messageType, callback) {
        if (!this.msgCallbacks[messageType]) this.msgCallbacks[messageType] = [];

        this.msgCallbacks[messageType].push(callback)
    }

    processMessage(message) {
        if (!this.msgCallbacks[message.type]) return;

        for (let foo of this.msgCallbacks[message.type]) {
            foo(message.data);
        }

    }

    //=================================CLICK=========================================//
    addClickCallback(type, callback) {
        if (!this.clickCallbacks[type]) this.clickCallbacks[type] = [];
        this.clickCallbacks[type].push(callback)
    }

    processClick(clickInfo) {
        if (!this.clickCallbacks[clickInfo.clickType]) return;

        for (let foo of this.clickCallbacks[clickInfo.clickType]) {
            foo(clickInfo.clickValue);
        }
    }

    //=================================SEND=========================================//
    /**
     * 
     * @param {window} reciever 
     * @param {string} messageType 
     * @param {*} messageData 
     */
    sendMessage(reciever, messageType, messageData) {
        reciever.postMessage(new Message(messageType, messageData), '*')
    }
}

//==========================MESSAGE CLASS=============================================//
class Message {
    /**
     * 
     * @param {string} type 
     * @param {*} data 
     */
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}


//========================SETUP=============================================//

let messageHandler = new MessageHandler();
for (let key in messageCallbacks) {
    messageHandler.addCallback(key, messageCallbacks[key]);
}

for (let key in clickCallbacks) {
    messageHandler.addClickCallback(key, clickCallbacks[key]);
}