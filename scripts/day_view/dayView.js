
const DATE_TITLE_ELEMENT = document.getElementById("date_title");
const HOLIDAY_SECTION = document.querySelector("#holiday_display");
const SCHEDULE_EDITOR_TARGET = document.querySelector('#schedule_section');
const HIST_LIST = document.querySelector('#hist_list');

let activeDate = new Date();




function setupPage(setupDate = new Date()) {
    activeDate = setupDate;
    setupNoteInputField();
    window.addEventListener('message', (message) => {
        if (message.data === 'templates loaded') {
            console.log('templates loaded');
            let form = new ScheduleFormular(new Date(2026, 2, 9));
            form.place(SCHEDULE_EDITOR_TARGET);
            const main = document.querySelector('main');
            form.setCalendarTarget(main)
        }
    })
    refresh();
    sendMessage(window.parent, 'send_daily_data', setupDate)
}

function setActiveDate(newDate = new Date()) {
    activeDate = newDate;

    refresh();
}

function historyFetchCallback(data) {
    HIST_LIST.innerHTML = '';
    const numItems = 5;
    let ev = data.data.Events;
    let choices = [];
    for (let i = 0; i < numItems; i++) {

        let randIndex = Math.floor(Math.random() * ev.length);
        let choice = ev[randIndex];
        ev.splice(randIndex, 1);
        let line = document.createElement('li');
        line.innerText = choice.year + ':\n' + choice.text;

        HIST_LIST.appendChild(line);

    }

}
function refresh() {
    DATE_TITLE_ELEMENT.innerHTML = CalendarTools.dateString(activeDate);
    Fetcher.tryFetch(`http://history.muffinlabs.com/date/${activeDate.getMonth() + 1}/${activeDate.getDate()}`, historyFetchCallback);
}

function refreshDailyData(dailyData) {
    displayTodayshNotes(dailyData.notes);
    refreshHoliday(dailyData.holidays);
}

/**
 * 
 * @param {Array<string>} holidayArr 
 */
function refreshHoliday(holidayArr) {
    let holidayStr = '';
    if (holidayArr.length == 0) holidayStr = 'kein Feiertag'
    else {
        for (let i = 0; i < holidayArr.length; i++) {
            holidayStr += (i == 0 ? '' : ' & ') + holidayArr[i];
        }
    }
    HOLIDAY_SECTION.innerText = 'Heute ist ' + holidayStr + '.';
}


