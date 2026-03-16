
const CALENDAR_TARGET = document.getElementById("calendar_target")
const CALENDAR_WRAPPER_ID = "calendar_wrapper";
const CALENDAR_SHEET_ID = "calendar_sheet";
const CALENDAR_HEAD_ID = "calendar_head";
const DATE_CONTAINER_CLASS_NAME = ".dateContainer";
const CAR = document.getElementById('car');
const SCENE_WINDOW = document.querySelector('#window');
const DAY_VIEW = document.querySelector('#day_view');

let dataSheet;
let activeDateCell;

let currentSheetDate; // of the sheet
let activeDayDate;  // of the active daily page



const CLICK_SOUND = new Audio("assets/sounds/minecraft_click.mp3");
messageHandler.addCallback('click', () => {
    CLICK_SOUND.play();
});

let startDate = new Date();
messageHandler.sendMessage(window, "setup", startDate);

const frames = document.getElementsByTagName("iFrame")
for (let i = 0; i < frames.length; i++) {
    let frame = frames[i];
    frame.onload = function () {
        messageHandler.sendMessage(frame.contentWindow, "setup", { date: startDate })
    }
}



