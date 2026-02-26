// !!!!----MONTH----!!!!
RECIEVERS.push(window);
sendMessage(window, "setup", new Date());

const frames = document.getElementsByTagName("iFrame")
for(let i = 0; i < frames.length; i++){
    let frame = frames[i];
    frame.onload = function(){
        RECIEVERS.push(frame.contentWindow);
        sendMessage(frame.contentWindow, "setup", {date: new Date()})
    }
}

function processMessage(message){
    switch(message.type){
        case "setup":
            setupPage(message.date);
            break;
        case "click":
            processClickMessage(message.data)
            break;
        case "log":
            break;
        default:
            console.log("Dunno what to do with that :( (month)")
            break;
    }
}

function processClickMessage(clickData){
    switch(clickData.clickType){
        case "date cell":
            dateClicked(clickData.clickValue);
            break;
        case "month scroll":
            addMonth(clickData.clickValue);
            break;
        case "add note":
            console.log("adding note", clickData.clickValue);
            addNote(clickData.clickValue)
            break;
        case "to day view":
            swipeRight()
            break;
        case "to month view":
            swipeLeft()
            break;
        default:
            console.log("Dunno what you just clicked :( (month)");
            break;
    }
}