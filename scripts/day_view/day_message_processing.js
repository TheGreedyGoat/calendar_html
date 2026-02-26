// !!!!----DAY----!!!!
RECIEVERS.push(window);
RECIEVERS.push(window.parent);


function processMessage(message){
    switch(message.type){
        case "setup":
            setupPage(message.data.date);
        break;
        case "click":
            processClickMessage(message.data);
            break;
        case "log":
            break;
        case "note object":
            refreshNotes(message.data);
        break;
        case "daily_data":
            refreshDailyData(message.data);
        break;
        default:
            console.log("Dunno what to do with that :(")
            break;
    }
}

function processClickMessage(clickData){
    switch(clickData.clickType){
        case "date cell":
            setActiveDate(clickData.clickValue)
            break;
        default:
            console.log("Dunno what you just clicked :( (Day)");
            break;
    }
}