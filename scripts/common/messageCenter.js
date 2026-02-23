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

// window.addEventListener("message", 
//     function(event){
//         console.log("message recieved")
//         handleMessage(event.data)
//     }
// )

// function checkMessageFormat(data){
//     return data.messageType && data.value
// }

// function handleMessage(data){
//     if(!checkMessageFormat(data)) {
//         console.log(`Invalid Message format ${data.messageType}, ${data.value}.`)
//         return false
//     }
//     switch(data.messageType){
//         case "log":
//             console.log(data.value)
//             break
//         case "alert":
//             alert(data.value)
//             break
//         case "click":
//             clickSound.play()
//             //clickEvent(data.value)
//             break
//         default: 
//             console.log(`Unknown data type ${data.messageType}.`)
//             return false
        
//     }
//     return true
// }



// function clickEvent(clickData){
//     console.log(clickData)
//     switch(clickData.clickType){
//         case "date":
//             let  w = clickData.w;
//             let d = clickData.d;
//             setActiveDate(currentDataSheet.getDataAtGridIndex(w, d).date);
//             break;
//         case "changeMonth":
//             addMonth(clickData.value)
//             break;
//             case "addNote":
//                 let note = clickData.value;
//             if(note != ""){
//                 CalendarTools.writeNote(activeDate, note);
//                 noteInputField.value = "";
//                 refreshDaySection();
//             }
//             break;
//         default:
//             console.log(`unknown clickType ${clickData.clickType}`)
//             break;
//     }
// }
