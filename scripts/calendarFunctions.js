



class CalendarTools{
    static weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    static months = ["Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    static dateInfos = []

    static dateCopy(d = new Date()){
        return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    }

    static dateString(date = new Date()){
        return `${date.getDate()}. ${CalendarTools.months[date.getMonth()]} ${date.getFullYear()}`
    }

    static getDateInfo(date = new Date()){
        for(let i = 0; i < this.dateInfos.length; i++){
            let info = this.dateInfos[i]
            if(info.date == date) return info
        }
        let newInfo = new DateInfos(date)
        this.dateInfos.push(newInfo)
        return newInfo
    }

    static writeNote(date = new Date(), note = "Hello World!"){
        let info = CalendarTools.getDateInfo(date)
        info.appendNote(note)
    }
    static daysBetweenSigned(date1  = new Date(), date2 = new Date()) {

        // The number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24;

        // Calculate the difference in milliseconds
        const differenceMs = date1 - date2;

        // Convert back to days and return
        return Math.round(differenceMs / ONE_DAY);

    }

    static buildWeekdayHeader(){
        let weekdays = CalendarTools.weekdays;
        let row = document.createElement("tr");
        for(let i = 0; i < weekdays.length; i++){
            let th = document.createElement("th");
            th.classList.add("calendarHeadCell")
            th.innerHTML = weekdays[i]
            row.appendChild(th)
        }
        return row
    }
}

class DateInfos{
    constructor(date = new Date()){
        this.date = date
        this.notes = document.createElement("ul")
    }

    appendNote(note = "Bla"){
        let noteLine = document.createElement("li")
        noteLine.innerHTML = note
        this.notes.appendChild(noteLine)
    }

    notes(){
        return this.notes
    }
}
