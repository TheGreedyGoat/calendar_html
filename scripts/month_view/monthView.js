const CALENDAR_TARGET = document.getElementById("calendar_target")
const CALENDAR_WRAPPER_ID = "calendar_wrapper";
const CALENDAR_SHEET_ID = "calendar_sheet";
const CALENDAR_HEAD_ID = "calendar_head";


let activeMonth;
let activeYear;


function setupPage(setupDate){
    setActiveDate(setupDate);
    
}

function setActiveDate(newDate = new Date()){
    let oldMonth = activeMonth;
    let oldYear = activeYear;
    activeMonth = newDate.getMonth();
    activeYear = newDate.getFullYear();
    if(newDate.getMonth() != oldMonth || newDate.getFullYear() != oldYear){
        placeHTMLSheet(new CalendarSheet(newDate))
    }

}



function buildDataSheet(date = new Date()){
    // DataSheet bauen
    currentDataSheet = CalendarSheet.getSheet(date)
}

function dateClicked(date){
    setActiveDate(date);
    swipeRight();
}


    

function placeHTMLSheet(sheet){
    if(CALENDAR_TARGET.firstChild.id == CALENDAR_SHEET_ID){
        CALENDAR_TARGET.removeChild(CALENDAR_TARGET.firstChild);
    }

    heading = document.getElementById(CALENDAR_HEAD_ID);
    heading.innerText = CalendarTools.monthYearStringInd(activeMonth, activeYear);
    let htmlSheet = sheet.toHTML();
    htmlSheet.setAttribute("id", CALENDAR_SHEET_ID);
    CALENDAR_TARGET.prepend(htmlSheet);
}
//

function swipeLeft(){
    document.querySelector("main").style.transform = "translateX(100dvw)"
}

function swipeRight(){
    document.querySelector("main").style.transform = "translateX(0dvw)"
}

function addMonth(n = 1){
    setActiveDate(new Date(activeYear, activeMonth + n, 1))
}

function addNote(noteMessageObject){
    if(!noteMessageObject.note) return;
    CalendarTools.writeNote(noteMessageObject.date, noteMessageObject.note);
    console.log();
    sendNotesToAll(noteMessageObject.date);
}

function sendNotesToAll(date = newDate()){
    let noteObject = CalendarTools.tryGetNotesOfDate(date);
    console.log(noteObject);
    if(noteObject){
        sendMessageToAllWindows("note object", noteObject);
    }
}
