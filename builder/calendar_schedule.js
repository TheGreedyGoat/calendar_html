
class CalendarSchedule{
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
     * @param {string} recurrence the unit of the recurrence (none, days, weeks, months, years)
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

        this.id = CalendarSchedule.ids++; // bräuchten später ein besseres System

        this.title = title;     // 'Geburtstag von Jutta'
        this.start = start;
        this.end = end;

        CalendarSchedule.masterSchedules.push(this);
    }

    /**
     * 
     * @param {Date} date 
     */
    static dateString(date){
        return`${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
    }

    /**
     * clear the cache and load new schedules within given interval
     * @param {Date} startDate 
     * @param {Date} endDate 
     */
    static updateCache(startDate, endDate){
        CalendarSchedule.cache = {};

        this.masterSchedules.forEach((schedule) => {
            let currentDate = new Date(schedule.start);
            let scheduleID = schedule.id;

            while(currentDate <= endDate){ // aufhören, wenn wir über der Obergrenze sind
                if(currentDate >= startDate){
                    if(!cache[scheduleID]) cache[scheduleID] = []
                    cache[scheduleID].push(CalendarSchedule.dateString(currentDate));
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


let startD = new Date(2026, 2, 3, 12, 0);
let endD = new Date(2026, 2, 3, 18, 30);

let testSchedule =  new CalendarSchedule('Testtermin', startD, endD, 'none');

console.log(CalendarSchedule.masterSchedules)


