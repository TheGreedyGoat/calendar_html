const clickSound = new Audio("assets/sounds/minecraft_click.mp3");
const RECIEVERS = [] // :iframes etc., fill in seperate script


window.addEventListener("message", function(event){
    recieveMessage(event.data);
});


function sendMessageToAllWindows(messageType, messageData){
    for(let i = 0; i < RECIEVERS.length; i++){
        let rec = RECIEVERS[i];
        sendMessage(rec, messageType, messageData)
    }
}

function sendMessage(reciever, messageType, messageData){
    reciever.postMessage({
            type: messageType,
            data: messageData
        }, "*");
}


function recieveMessage(message){
    processMessage(message);    // seperate script
}

