
let frame = document.querySelector("#day_view");
recievers.push(frame.contentWindow);

function processMessage(message){
    console.log(message)
    switch(message.type){
        case "click":
            processClickMessage(message.data)
            break;
        case "log":
            break;
        default:
            console.log("Dunno what to do with that :(")
            break;
    }
}

function processClickMessage(clickData){
    switch(clickData.clickType){
        case "date cell":
            setActiveDate(clickData.clickValue);
            break;
        case "month scroll":
            addMonth(clickData.clickValue);
            break;
        default:
            console.log("Dunno what you just clicked :(");
            break;
    }
}