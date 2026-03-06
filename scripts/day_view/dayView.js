
const DATE_TITLE_ELEMENT = document.getElementById("date_title")
const HOLIDAY_SECTION = document.querySelector("#holiday_section")

let activeDate = new Date();

function setupPage(setupDate = new Date()){
    activeDate = setupDate;
    setupNoteInputField();
    refresh();
    sendMessage(window.parent, 'send_daily_data', setupDate)
}

function setActiveDate(newDate = new Date()){
    activeDate = newDate;
    refresh();
}


function refresh(){
    DATE_TITLE_ELEMENT.innerHTML = CalendarTools.dateString(activeDate);
}

function refreshDailyData(dailyData){
    displayTodayshNotes(dailyData.notes);
    refreshHoliday(dailyData.holidays);
}

/**
 * 
 * @param {Array<string>} holidayArr 
 */
function refreshHoliday(holidayArr){
    console.log(holidayArr);
    let holidayStr = '';
    if(holidayArr.length == 0) holidayStr = 'kein Feiertag'
    else {
        for(let i = 0; i < holidayArr.length; i++){
            holidayStr += (i == 0? '' : ' & ') + holidayArr[i]; 
        }
    }
    HOLIDAY_SECTION.innerText = 'Heute ist ' + holidayStr + '.';
}


