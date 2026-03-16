
const DATE_TITLE_ELEMENT = document.getElementById("date_title");
const HOLIDAY_SECTION = document.querySelector("#holiday_display");

const NEW_SCHEDULE_HEADER = document.querySelector('#new_schedule_header');
const NEW_SCHEDULE_WRAPPER = document.querySelector('#new_schedule_wrapper');
const SCHEDULE_HEADER = document.querySelector('#schedule_header');
const SCHEDULE_LIST = document.querySelector('#schedule_list');


let scheduleForm;

const HIST_LIST = document.querySelector('#hist_list');

let activeDate = new Date();




function setupPage(setupData) {

    activeDate = setupData.date;
    setupNoteInputField();
    window.addEventListener('message', (message) => {
        if (message.data === 'templates loaded') {
            console.log('templates loaded');
            scheduleForm = new ScheduleFormular(new Date());
            scheduleForm.place(NEW_SCHEDULE_WRAPPER);
            const main = document.querySelector('main');
            scheduleForm.setCalendarTarget(main);

            SCHEDULE_HEADER.addEventListener('click', () => {
                handler.sendMessage(window.parent, 'click', { clickType: 'showHideSchedule' });
                SCHEDULE_LIST.hidden = !SCHEDULE_LIST.hidden
            });

            NEW_SCHEDULE_HEADER.addEventListener('click', () => {
                handler.sendMessage(window.parent, 'click', { clickType: 'showHideNewSchedule' });
                NEW_SCHEDULE_WRAPPER.hidden = !NEW_SCHEDULE_WRAPPER.hidden;

            });
        }
    })
    refresh();
    handler.sendMessage(window.parent, 'send_daily_data', activeDate)
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
    displayTodaysSchedules(dailyData.schedules);
}

/**
 * 
 * @param {Array} schedules 
 */
function displayTodaysSchedules(schedules) {

    SCHEDULE_LIST.innerHTML = '';
    for (let value of schedules) {
        let line = document.createElement('li');
        let header = document.createElement('h4');

        line.appendChild(header);
        SCHEDULE_LIST.appendChild(line);

        header.innerText = value.title;
        line.innerHTML +=
            `Beginn: ${value.start.toLocaleDateString()}, Ende: ${value.end.toLocaleDateString()}`


    }
}

/**
 * 
 * @param {Array<string>} holidayArr 
 */
function refreshHoliday(holidayArr) {
    const extraTexts = {
        'Pokemon Day': "Gotta Catch 'em all!",
        'Star Wars Day': "May the 4th be with you!",
        'PI-Day': "Go, get yourself some &#960. You deserve it!",
        "Heiligabend": 'HOHOHO!',
        "1.Weihnachtstag": 'HOHOHO!',
        "1.Weihnachtstag": 'HOHOHO!',
        'Ostersonntag': 'Ran an die Eier!'

    }
    let holidayStr = '';
    if (holidayArr.length == 0) holidayStr = 'kein Feiertag'
    else {
        for (let i = 0; i < holidayArr.length; i++) {
            holidayStr += (i == 0 ? '' : ' & ') + holidayArr[i];
        }
    }
    HOLIDAY_SECTION.innerText = 'Heute ist ' + holidayStr + '.\n';
    if (extraTexts[holidayStr]) {
        HOLIDAY_SECTION.innerText += extraTexts[holidayStr]
    }

}


