

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
            messageHandler.sendMessage(window, "click", {
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

    updateScheduleCache();
    sendDataToDayView(activeDayDate)
}

/**
 * 
 * @param {Date} date 
 */
function onDateClicked(date) {
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
 * 
 * @param {number} n 
 */
function addDay(n = 1) {
    let newDate = new Date(activeDayDate);
    newDate.setDate(newDate.getDate() + n);

    onDateClicked(newDate);
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

    messageHandler.sendMessage(DAY_VIEW.contentWindow, 'daily_data', {
        date: activeDayDate,
        notes: notes,
        holidays: holidays,
        schedules: schedules
    });

}
