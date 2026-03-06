
const CLICK_SOUND = new Audio("assets/sounds/minecraft_click.mp3");
// !!!!----MONTH----!!!!
let startDate = new Date();
RECIEVERS.push(window);
sendMessage(window, "setup", startDate);

const frames = document.getElementsByTagName("iFrame")
for(let i = 0; i < frames.length; i++){
    let frame = frames[i];
    frame.onload = function(){
        RECIEVERS.push(frame.contentWindow);
        sendMessage(frame.contentWindow, "setup", {date: startDate})
    }
}

function processMessage(message){
    switch(message.type){
        case "setup":
            switchToDate(message.data);
            break;
        case "click":
            CLICK_SOUND.play()
            processClickMessage(message.data)
            break;
        case "log":
            break;
        case 'send_daily_data':
            sendDataToDayView(message.data);
        default:
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
            swipeToDay()
            break;
        case "to month view":
            swipeToMonth()
            break;
        default:
            break;
    }
}