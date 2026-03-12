const CALENDAR_TARGET = document.getElementById("calendar_target")
const CALENDAR_WRAPPER_ID = "calendar_wrapper";
const CALENDAR_SHEET_ID = "calendar_sheet";
const CALENDAR_HEAD_ID = "calendar_head";
const DATE_CONTAINER_CLASS_NAME = ".dateContainer";
const CAR = document.getElementById('car');
const SCENE_WINDOW = document.querySelector('#window');

let dataSheet;
let activeDateCell;

let currentSheetDate; // of the sheet
let activeDayDate;  // of the active daily page



/**
 * 
 * @param {Date} newDate 
 */
function switchToDate(newDate) {
    activeDayDate = newDate;
    currentSheetDate = newDate;
    if (!dataSheet) {
        dataSheet = new CalendarSheet(newDate);
        dataSheet.addDateClickEvent((date) => {
            sendMessageToAllWindows("click", {
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

    sendMessageToAllWindows('daily_data', {
        notes: notes,
        holidays: holidays,
        schedules: schedules
    });

}

/**
 * to check how we write numbers, wich wallpaper to choose etc.
 */
function checkForSpecialFormatting() {
    let dateContainers = dataSheet.htmlSheet.querySelectorAll(DATE_CONTAINER_CLASS_NAME);
    let holidaysArr = Holidays.getHolidays(activeDayDate).split(',');

    let format = function (n) { return n };
    let wallpaper = 'UglyWallpaper.png'
    let windowScene = 'road_background.png';
    let car = 'car.png';
    if (holidaysArr != null) {
        for (let i = 0; i < holidaysArr.length; i++) {
            let holiday = holidaysArr[i];


            switch (holiday) {
                case 'e-day':
                    format = eFormat;
                    break;
                case 'PI-Day':
                    format = piFormat;
                    break;
                case 'Star Wars Day':
                    wallpaper = 'R2C3.png';
                    windowScene = 'SW_backGround.png';
                    car = 'falcon.png'
                    break;
                default:
                    break;
            }
        }
    }
    for (let i = 0; i < dateContainers.length; i++) {
        let container = dateContainers[i]
        let num = dataSheet.dataStorage[i].date.getDate();
        container.innerHTML = format(num);

    }

    heading = document.getElementById(CALENDAR_HEAD_ID);
    heading.innerHTML = CalendarTools.monthYearStringByNums(currentSheetDate.getMonth(), format(currentSheetDate.getFullYear(), 4));
    document.querySelector('main').style.backgroundImage = 'url(assets/images/wallpapers/' + wallpaper + ')';
    SCENE_WINDOW.style.backgroundImage = 'url(assets/images/window/' + windowScene + ')';
    CAR.setAttribute('src', '/assets/images/window/' + car);
}

/**
 * 
 * @param {number} num 
 * @param {number} digits 
 * @returns {string} 
 */
function eFormat(num, digits = 2) {
    let pow = Math.pow(10, digits)
    let ln = Math.round(pow * (Math.log(num))) / pow;
    return 'e' + '<sup>' + ln + '</sup>';
}

function piFormat(num, digits = 1) {

    let pow = Math.pow(10, digits)
    let piMult = Math.round(pow * num / Math.PI) / pow;
    return piMult + '&#960';
}
