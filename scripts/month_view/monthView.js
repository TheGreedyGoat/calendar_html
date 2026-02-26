const CALENDAR_TARGET = document.getElementById("calendar_target")
const CALENDAR_WRAPPER_ID = "calendar_wrapper";
const CALENDAR_SHEET_ID = "calendar_sheet";
const CALENDAR_HEAD_ID = "calendar_head";

let dataSheet;

let activeMonth;
let activeYear;
let activeDay;


function setupPage(setupDate){
    setActiveDate(setupDate);
}

async function setActiveDate(newDate = new Date()){
    let oldMonth = activeMonth;
    let oldYear = activeYear;
    activeDay = newDate.getDate();
    activeMonth = newDate.getMonth();
    activeYear = newDate.getFullYear();
    if(newDate.getMonth() != oldMonth || newDate.getFullYear() != oldYear){
        let holidayData = await Fetcher.requestHolidaysFromDate(newDate);
        updateHTMLSheet(new CalendarSheet(new Date(activeYear, activeMonth, activeDay), holidayData));
    }

}

    

function updateHTMLSheet(sheet){
    if(CALENDAR_TARGET.firstChild.id == CALENDAR_SHEET_ID){
        CALENDAR_TARGET.removeChild(CALENDAR_TARGET.firstChild);
    }

    dataSheet = sheet

    heading = document.getElementById(CALENDAR_HEAD_ID);
    heading.innerText = CalendarTools.monthYearStringInd(activeMonth, activeYear);
    let htmlSheet = sheet.toHTML();
    htmlSheet.setAttribute("id", CALENDAR_SHEET_ID);
    CALENDAR_TARGET.prepend(htmlSheet);
}



function dateClicked(date){
    setActiveDate(date);
    sendDataToDayView(date);
    swipeRight();
}


function swipeLeft(){
    document.querySelector("main").style.transform = "translateX(100dvw)"
}

function swipeRight(){
    document.querySelector("main").style.transform = "translateX(0dvw)"
}

function addMonth(n = 1){
    setActiveDate(new Date(activeYear, activeMonth + n, 1))
}

/**
 * speichert eine von der Tagesansicht gesendete neue Notiz
 * @param {*} noteMessageObject 
 */
function addNote(noteMessageObject){
    if(!noteMessageObject.note) return;
    CalendarTools.writeNote(noteMessageObject.date, noteMessageObject.note);
    console.log(CalendarTools.dateNotes);
}


function sendDataToDayView(date = newDate()){
    //get all the data 
    let notes = CalendarTools.getOnlyNotesOfDate(date);
    let holiday = dataSheet.getDataFromDate(date).holiday;

    //send it

    sendMessageToAllWindows('daily_data', {
        notes : notes,
        holiday: holiday
    });

}
