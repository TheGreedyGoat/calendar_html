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



/**
 * 
 * @param {Date} newDate 
 */
function switchToDate(newDate) {
    activeDayDate = new Date(newDate);
    currentSheetDate = newDate;
    if (!dataSheet) {
        dataSheet = new CalendarSheet(newDate);
        dataSheet.addDateClickEvent((date) => {
            handler.sendMessage(window, "click", {
                clickType: "date cell",
                clickValue: date
            });
        });
        CALENDAR_TARGET.prepend(dataSheet.toHTML());
        Holidays.addHolidaysToDataSheet(dataSheet);
        checkForSpecialFormatting();
        new Schedule('Juttas Geburtstag', new Date(2026, 2, 13), new Date(2026, 2, 13, 23, 59, 59), 'yearly', 1);
        new Schedule('Paules Geburtstag', new Date(2026, 2, 22), new Date(2026, 2, 22, 23, 59, 59), 'yearly', 1);
        new Schedule('Bad putzen!', new Date(2026, 2, 12, 12), new Date(2026, 2, 12, 23, 59, 59), 'weekly', 1);

    } else {
        updateSheet();
    }

    updateScheduleCache();
    markActiveDate();
}
/**
 * 
 */
function markActiveDate() {
    let dateCells = dataSheet.htmlSheet.querySelectorAll('.day');
    if (activeDateCell) {
        activeDateCell.classList.remove('active');
    }
    for (let i = 0; i < dateCells.length; i++) {
        if (CalendarTools.datesEqual(dataSheet.dataStorage[i].date, activeDayDate)) {

            activeDateCell = dateCells[i];
            activeDateCell.classList.add('active');
        }
    }
}


function updateSheet() {
    dataSheet.setup(currentSheetDate);
    Holidays.addHolidaysToDataSheet(dataSheet);
    checkForSpecialFormatting();
}

function updateScheduleCache() {
    Schedule.addSchedulesToDataSheet(dataSheet);
}
function saveNewSchedule(scheduleData) {
    new Schedule(scheduleData.title, scheduleData.startDate, scheduleData.endDate, scheduleData.recurrence, scheduleData.recurrenceFrequ);
    console.log(Schedule.masterSchedules);
    updateScheduleCache();
}

/**
 * 
 * @param {Date} date 
 */
function dateClicked(date) {
    switchToDate(date);
    sendDataToDayView(date);
    swipeToDay();
}


/**
 * 
 * @param {number} n 
 */
function addMonth(n = 1) {
    currentSheetDate.setMonth(currentSheetDate.getMonth() + n);
    updateSheet();
}

/**
 * speichert eine von der Tagesansicht gesendete neue Notiz
 * @param {*} noteMessageObject 
 */
function addNote(noteMessageObject) {
    if (!noteMessageObject.note) return;
    CalendarTools.writeNote(noteMessageObject.date, noteMessageObject.note);
}

/**
 * 
 * @param {Date} date 
 */
function sendDataToDayView(date = newDate()) {
    //get all the data 
    let notes = CalendarTools.getOnlyNotesOfDate(date);
    let holidayString = Holidays.getHolidays(date);
    let holidays = holidayString === '' ? [] : holidayString.split(',');
    let schedules = Schedule.getSchedulesOfDate(date);
    //send it

    handler.sendMessage(DAY_VIEW.contentWindow, 'daily_data', {
        notes: notes,
        holidays: holidays,
        schedules: schedules
    });

}
