
class Schedule{
    static masterSchedules = [];
    static cache = {
        // id : [y_m_d, ...]
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
    constructor(title, start, end, recurrence = 'none', recurrenceFrequ = 1){

        if(start.getTime() >= end.getTime()){
            //ungültige Zeitspanne
            throw new Error('Ereignisbeginn darf nicht vor dem Ende liegen!');
        }
        if(title === ''){
            throw new Error('Ereignisname muss ein nicht leerer String sein!');
        }

        this.recurrence = recurrence;
        if(recurrence != 'none'){
            this.recurrenceFrequ = recurrenceFrequ
        }

        this.id = Schedule.ids++; // bräuchten später ein besseres System

        this.title = title;     // 'Geburtstag von Jutta'
        this.start = start;
        this.end = end;

        Schedule.masterSchedules.push(this);
    }

    /**
     * 
     * @param {Date} date 
     */
    static dateString(date){
        return`${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
    }

    /**
     * returns the number of days covered by a given interval
     * @param {Date} start 
     * @param {Date} end 
     * @returns {number}
     */
    static daysWithinInterval(start, end){
        let days = 0
        let currentDate = new Date(start);
        currentDate.setMilliseconds(0);
        currentDate.setSeconds(0);
        currentDate.setMinutes(0);
        currentDate.setHours(0);
        while(currentDate <= end){
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
    static updateCache(intervStart, intervEnd){
        Schedule.cache = {};

        this.masterSchedules.forEach((schedule) => {
            let currentDate = new Date(schedule.start);
            let scheduleID = schedule.id;
            let numDaysOfSchedule = Schedule.daysWithinInterval(schedule.start, schedule.end);

            while(currentDate <= intervEnd){ // aufhören, wenn wir über der Obergrenze sind
                let currentCopy = new Date(currentDate);
                for(let i = 0; i < numDaysOfSchedule; i++){
                    if(currentCopy >= intervStart){
                        if(!Schedule.cache[scheduleID]) Schedule.cache[scheduleID] = []
                        Schedule.cache[scheduleID].push(Schedule.dateString(currentCopy));
                    }
                    currentCopy.setDate(currentCopy.getDate() + 1);
                }
                

                if(schedule.recurrence === 'none') break;   // <= no recurrence, continue with next master
                switch(schedule.recurrence){
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
        })
    }

    /**
     * checks if a date is within a given interval (including the limits)
     * @param {Date} date the date to check
     * @param {Date} start start of the interval
     * @param {Date} end end of the interval
     */
    static isDateInIntervall(date, start, end){
        return !(start > end) && date >= start && date <= end;
    }

}


// let s1 = {
//     title: 'Termin_1',
//     start: new Date(2024,2,4),
//     end: new Date(2024, 2, 6),

// };

// new Schedule(s1.title, s1.start, s1.end, 'yearly');

// console.log(Schedule.masterSchedules);
// Schedule.updateCache(new Date(2026,2,1), new Date(2026,2,31));

// console.log(Schedule.cache);
