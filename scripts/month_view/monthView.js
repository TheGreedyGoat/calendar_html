const CALENDAR_TARGET = document.getElementById("calendar_target")
const CALENDAR_WRAPPER_ID = "calendar_wrapper";
const CALENDAR_SHEET_ID = "calendar_sheet";
const CALENDAR_HEAD_ID = "calendar_head";

let dataSheet;

let activeMonth;
let activeYear;
let activeDay;

/**
 * async, weil wir ggf. die Feiertage fetchen müssen
 * @param {Date} newDate 
 */
async function switchToDate(newDate){
    
    console.log("switchig to  date", newDate.toLocaleDateString())
    let oldMonth = activeMonth;
    let oldYear = activeYear;
    activeDay = newDate.getDate();
    activeMonth = newDate.getMonth();
    activeYear = newDate.getFullYear();
    if(newDate.getMonth() != oldMonth || newDate.getFullYear() != oldYear){
        let holidayData = await Fetcher.requestHolidaysFromDate(newDate);
        placeHTMLSheet(new CalendarSheet(new Date(activeYear, activeMonth, activeDay), holidayData));
    }

    checkEday()
}

function isEday(){
    console.log(activeMonth, activeDay)
    return activeMonth == 0 && activeDay == 27;
}

function checkEday(){
    if(isEday()){
        console.log("E-DAY!")
        let dateDivs = document.querySelectorAll(".dateContainer");
        for(let div of dateDivs){
            let num = parseInt(div.innerHTML);
            if(isNaN(num)) return;
            console.log("still here")
            div.innerHTML = "e" + "<sup>" + Math.floor(100 * Math.log(num)) / 100 + '</sup>'
        }
    }
}
    
/**
 * 
 * @param {CalendarSheet} sheet 
 */
function placeHTMLSheet(sheet){
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


/**
 * 
 * @param {Date} date 
 */
function dateClicked(date){
    switchToDate(date);
    sendDataToDayView(date);
    swipeToDay();
}


/**
 * 
 * @param {number} n 
 */
function addMonth(n = 1){
    switchToDate(new Date(activeYear, activeMonth + n, 1))
}

/**
 * speichert eine von der Tagesansicht gesendete neue Notiz
 * @param {*} noteMessageObject 
 */
function addNote(noteMessageObject){
    if(!noteMessageObject.note) return;
    CalendarTools.writeNote(noteMessageObject.date, noteMessageObject.note);
}

/**
 * 
 * @param {Date} date 
 */
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
