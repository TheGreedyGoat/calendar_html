
const DATE_TITLE_ELEMENT = document.getElementById("date_title")
const HOLIDAY_SECTION = document.querySelector("#holiday_section")

let activeDate = new Date();

function setupPage(setupDate = new Date()){
    activeDate = setupDate;
    setupNoteInputField();
}

function setActiveDate(newDate = new Date()){
    activeDate = newDate;
    refresh();
}


function refresh(){
    DATE_TITLE_ELEMENT.innerHTML = CalendarTools.dateString(activeDate);
}

function refreshDailyData(dailyData){
    refreshNotes(dailyData.notes);
    refreshHoliday(dailyData.holiday);
}

/**
 * 
 * @param {string} holiday 
 */
function refreshHoliday(holiday){
    HOLIDAY_SECTION.innerText = "Heute ist " + holiday;
}
