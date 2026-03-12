
class Schedule {
    static masterSchedules = {
        // id : {
        //
        //}
    };
    static cache = {
        // yyyy_m_d : [id, progress] (progress: eg. day no 2 of max 3)
    }
    static ids = 0;
    /**
     * 
     * @param {string} title 
     * @param {Date} start 
     * @param {Date} end 
     * @param {string} recurrence the unit of the recurrence (none, daily, weekly, monthly or yearly)
     * @param {number} recurrenceFrequ how many of the given time units should be in between recurrences? eg every 3 days
     */
    constructor(title, start, end, recurrence = 'none', recurrenceFrequ = 1) {
        if (start.getTime() >= end.getTime()) {
            //ungültige Zeitspanne
            throw new Error('Ereignisbeginn darf nicht vor dem Ende liegen!');
        }
        if (title === '') {
            throw new Error('Ereignisname muss ein nicht leerer String sein!');
        }

        this.recurrence = recurrence;
        if (recurrence != 'none') {
            this.recurrenceFrequ = recurrenceFrequ
        }

        this.id = 'schedule_' + Schedule.ids++;

        this.title = title;     // 'Geburtstag von Jutta'
        this.start = start;
        this.end = end;

        Schedule.masterSchedules[this.id] = this;
    }

    static createSchedule(dataObj) {
        return new Schedule(dataObj.title, dataObj.startDate, dataObj.endDate, dataObj.recurrence, dataObj.recurrenceFrequ)
    }

    /**
     * 
     * @param {Date} date 
     */
    static dateString(date) {
        return `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
    }

    /**
     * 
     * @param {string} dateString YYYY_M_D
     */
    static dateFromDateString(dateString) {
        let values = dateString.split('_');
        let y = parseInt(values[0]);
        let m = parseInt(values[1]);
        let d = parseInt(values[2]);
        return new Date(y, m, d);
    }

    /**
     * returns the number of days covered by a given interval
     * @param {Date} start 
     * @param {Date} end 
     * @returns {number}
     */
    static daysWithinInterval(start, end) {
        let days = 0
        let currentDate = new Date(start);
        currentDate.setMilliseconds(0);
        currentDate.setSeconds(0);
        currentDate.setMinutes(0);
        currentDate.setHours(0);
        while (currentDate <= end) {
            days++;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    }

    /**
     * clear the cache and load new schedules within given interval
     * @param {Date} intervStart 
     * @param {Date} intervEnd 
     */
    static updateCache(intervStart, intervEnd) {
        Schedule.cache = {};
        for (let id in this.masterSchedules) {
            let schedule = this.masterSchedules[id];
            let currentDate = new Date(schedule.start);
            let scheduleID = id;
            let numDaysOfSchedule = Schedule.daysWithinInterval(schedule.start, schedule.end);

            while (currentDate <= intervEnd) { // aufhören, wenn wir über der Obergrenze sind
                let currentCopy = new Date(currentDate);
                for (let i = 0; i < numDaysOfSchedule; i++) {
                    // console.log(currentCopy, intervStart);
                    if (currentCopy >= intervStart) {
                        let dateString = Schedule.dateString(currentCopy);
                        if (!Schedule.cache[dateString]) Schedule.cache[dateString] = [];
                        Schedule.cache[dateString].push([id, `${i}/${numDaysOfSchedule}`]);
                    }
                    currentCopy.setDate(currentCopy.getDate() + 1);
                }


                if (schedule.recurrence === 'none') break;   // <= no recurrence, continue with next master
                switch (schedule.recurrence) {
                    case 'yearly':
                        currentDate.setFullYear(currentDate.getFullYear() + schedule.recurrenceFrequ);
                        break;
                    case 'monthly':
                        currentDate.setMonth(currentDate.getMonth() + schedule.recurrenceFrequ);
                        break;
                    case 'weekly':
                        currentDate.setDate(currentDate.getDate() + (schedule.recurrenceFrequ * 7));
                        break;
                    case 'daily':
                        currentDate.setDate(currentDate.getDate() + schedule.recurrenceFrequ);
                        break;
                    default:
                        throw new Error(schedule.recurrence + ' is not a valid recurrence! accepted values: "yearly", "monthly", "weekly", "daily", "none"');
                }

            }
        }
    }



    /**
     * checks if a date is within a given interval (including the limits)
     * @param {Date} date the date to check
     * @param {Date} start start of the interval
     * @param {Date} end end of the interval
     */
    static isDateInIntervall(date, start, end) {
        return !(start > end) && date >= start && date <= end;
    }

    /**
     * 
     * @param {CalendarSheet} dataSheet 
     */
    static addSchedulesToDataSheet(dataSheet) {
        let start = new Date(dataSheet.dataStorage[0].date);
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);
        let end = new Date(dataSheet.dataStorage[dataSheet.dataStorage.length - 1].date);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);

        Schedule.updateCache(start, end);

        for (let data of dataSheet.dataStorage) {
            for (const key in Schedule.cache) {
                if (key === Schedule.dateString(data.date)) {
                    data.addHTMLClass('schedule');
                }

            }
        }

    }


    static getSchedulesOfDate(date) {
        //get cache entry
        let cacheEntries = Schedule.cache[Schedule.dateString(date)];
        if (!cacheEntries) return [];
        let results = [];
        for (let i = 0; i < cacheEntries.length; i++) {
            let currentEntry = cacheEntries[i];
            //use id to get masterSchedule
            let scheduleID = currentEntry[0];
            let mSchedule = Schedule.masterSchedules[scheduleID];
            //assemble data
            let title = mSchedule.title;
            let progress = currentEntry[1].split('/');
            let start = new Date(date);
            start.setDate(start.getDate() - parseInt(progress[0]));
            let end = new Date(start);
            end.setDate(end.getDate() + parseInt(progress[1] - 1));
            results.push({
                title: title,
                start: start,
                end: end
            });
        }

        return results
    }
    /**
     * 
     * @param {string} id 
     * @returns {boolean}
     */
    static hasID(id) {
        return Schedule.masterSchedules[id] != undefined;
    }
}

