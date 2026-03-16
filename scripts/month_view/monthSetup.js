


const CLICK_SOUND = new Audio("assets/sounds/minecraft_click.mp3");

let startDate = new Date();

handler.sendMessage(window, "setup", startDate);

const frames = document.getElementsByTagName("iFrame")
for (let i = 0; i < frames.length; i++) {
    let frame = frames[i];
    frame.onload = function () {
        handler.sendMessage(frame.contentWindow, "setup", { date: startDate })
    }
}



