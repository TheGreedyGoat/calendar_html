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
        renderHTMLSheet(new CalendarSheet(newDate));
    }
    checkForSpecialFormatting();
    markActiveDate();
}

function switchMonth(newMonthsDate){
    currentSheetDate = newMonthsDate;
    renderHTMLSheet(new CalendarSheet(newMonthsDate));
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
function renderHTMLSheet(sheet){
    if(CALENDAR_TARGET.firstChild.id == CALENDAR_SHEET_ID){
        CALENDAR_TARGET.removeChild(CALENDAR_TARGET.firstChild);
    }

    Holidays.addHolidaysOfYear();

    dataSheet = sheet

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

/**
 * to check how we write numbers, wich wallpaper to choose etc.
 */
function checkForSpecialFormatting(){
    let dateContainers = htmlSheet.querySelectorAll(DATE_CONTAINER_CLASS_NAME);
    let holidaysArr = Holidays.getHolidays(activeDayDate).split(',');
    
    let format = function(n){return n};
    let wallpaper = 'UglyWallpaper.png'
    if(holidaysArr != null){
        for(let i = 0; i < holidaysArr.length; i++){
            let holiday = holidaysArr[i];


            switch(holiday){
                case 'e-day':
                    format = eFormat;
                    break;
                case 'PI-Day':
                    format = piFormat;
                    break;
                case 'Star Wars Day':
                    wallpaper = 'R2C3.png'
                    break;
                default:
                    console.log('no special formatting')
                    break;
            }
        }
    }
    for(let i = 0; i < dateContainers.length; i++){
        let container = dateContainers[i]
        let num = dataSheet.dataStorage[i].date.getDate();
        container.innerHTML = format(num);

    }
    
    heading = document.getElementById(CALENDAR_HEAD_ID);
    heading.innerHTML = CalendarTools.monthYearStringByNums(currentSheetDate.getMonth(), format(currentSheetDate.getFullYear(), 4));
    document.querySelector('main').style.backgroundImage = 'url(assets/images/wallpapers/' + wallpaper + ')';
    
}

/**
 * 
 * @param {number} num 
 * @param {number} digits 
 * @returns {string} 
 */
function eFormat(num, digits = 2){
    let pow = Math.pow(10, digits)
    let ln = Math.round(pow * (Math.log(num))) / pow;
    return 'e' + '<sup>' + ln + '</sup>';
}

function piFormat(num, digits = 1){
    
    let pow = Math.pow(10, digits)
    let piMult = Math.round( pow * num / Math.PI) / pow;
    return piMult + '&#960';
}