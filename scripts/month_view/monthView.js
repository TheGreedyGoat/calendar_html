const CALENDAR_TARGET = document.getElementById("calendar_target")
const CALENDAR_WRAPPER_ID = "calendar_wrapper";
const CALENDAR_SHEET_ID = "calendar_sheet";
const CALENDAR_HEAD_ID = "calendar_head";
const DATE_CONTAINER_CLASS_NAME = ".dateContainer";

let dataSheet;
let htmlSheet;
let activeDateCell;

let currentSheetDate; // of the sheet
let activeDayDate;  // of the active daily page

/**
 * 
 * @param {Date} newDate 
 */
function switchToDate(newDate){
    
    let oldMonth;
    let oldYear;
    if(currentSheetDate){
        oldMonth = currentSheetDate.getMonth();
        oldYear = currentSheetDate.getFullYear();
    }
    activeDayDate = newDate;
    currentSheetDate = newDate;


    if(newDate.getMonth() != oldMonth || newDate.getFullYear() != oldYear){
        placeHTMLSheet(new CalendarSheet(newDate));
    }
    checkForSpecialFormatting();
    markActiveDate();
}

function switchMonth(newMonthsDate){
    currentSheetDate = newMonthsDate;
    placeHTMLSheet(new CalendarSheet(newMonthsDate));
    checkForSpecialFormatting();
}
/**
 * 
 */
function markActiveDate(){
        let dateCells = htmlSheet.querySelectorAll('.day');
        if(activeDateCell){
            activeDateCell.classList.remove('active');
        }
        for(let i = 0; i < dateCells.length; i++){
            if(CalendarTools.datesEqual(dataSheet.dataStorage[i].date, activeDayDate)){
                
                activeDateCell = dateCells[i];
                activeDateCell.classList.add('active');
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
    heading.innerText = CalendarTools.monthYearStringInd(currentSheetDate.getMonth(), currentSheetDate.getFullYear());
    htmlSheet = sheet.toHTML();

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
    let newMonthsDate =   new Date(currentSheetDate.getFullYear(), currentSheetDate.getMonth() + n, 1);
    switchMonth(newMonthsDate);
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
    let holidays = dataSheet.getDataFromDate(date).holidays;

    //send it

    sendMessageToAllWindows('daily_data', {
        notes : notes,
        holidays: holidays
    });

}


function checkForSpecialFormatting(){
    let dateContainers = htmlSheet.querySelectorAll(DATE_CONTAINER_CLASS_NAME);
    let holidaysArr = Holidays.getHolidays(activeDayDate).split(',');
    
    if(holidaysArr == null) return;
    let format = function(n){return n};
    for(let i = 0; i < holidaysArr.length; i++){
        let holiday = holidaysArr[i];


        switch(holiday){
            case 'e-day':
                format = eFormat;
                break;
            case 'PI-Day':
                format = piFormat;
                break;
            default:
                console.log('no special formatting')
                break;
        }
    }
    for(let i = 0; i < dateContainers.length; i++){
        let container = dateContainers[i]
        let num = dataSheet.dataStorage[i].date.getDate();
        container.innerHTML = format(num);

    }
    
}

function eFormat(num){
    let ln = Math.round(100 * (Math.log(num))) / 100;
    return 'e' + '<sup>' + ln + '</sup>';
}

function piFormat(num){
    let piMult = Math.round( 10 * num / Math.PI) / 10;
    return piMult + '&#960';
}